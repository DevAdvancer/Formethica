'use client'

import { useEffect, useState, useCallback } from 'react'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useConfirmation } from '@/lib/confirmation-context'
import { useFormsFast as useForms } from '@/lib/hooks/use-forms-fast'
import FormCard from '@/components/form-card'
import ProtectedRoute from '@/components/protected-route'

function DashboardContent() {
  const { user, userProfile } = useAuth()
  const { confirm, showSuccess, showError } = useConfirmation()
  const {
    forms,
    loading,
    error,
    deleteForm: deleteFormHook,
    updateForm,
  } = useForms()
  const [mounted, setMounted] = useState(false)
  const [dashboardStats, setDashboardStats] = useState({
    totalSubmissions: 0,
    activeForms: 0,
    recentActivity: 0,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate dashboard statistics
  useEffect(() => {
    if (forms.length > 0) {
      const totalSubmissions = forms.reduce(
        (sum, form) => sum + (form.submission_count || 0),
        0
      )
      const activeForms = forms.filter((form) => form.is_active).length
      const recentActivity = forms.filter((form) => {
        const dateString = form.updated_at || form.created_at
        if (!dateString) return false
        const updatedAt = new Date(dateString)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return updatedAt > weekAgo
      }).length

      setDashboardStats({
        totalSubmissions,
        activeForms,
        recentActivity,
      })
    }
  }, [forms])

  // Show error if there's one from the hook
  useEffect(() => {
    if (error) {
      showError('Error', error)
    }
  }, [error, showError])

  const copyToClipboard = useCallback(
    async (shortCode: string, event: React.MouseEvent) => {
      if (typeof window === 'undefined') {
        return
      }

      // Generate the full URL from the short code
      const fullUrl = `${window.location.origin}/s/${shortCode}`

      try {
        // Try using the modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(fullUrl)
        } else {
          // Fallback for older browsers or non-HTTPS contexts
          const textArea = document.createElement('textarea')
          textArea.value = fullUrl
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()
          document.execCommand('copy')
          textArea.remove()
        }

        // Show success feedback with the actual URL
        showSuccess('Link Copied!', `Form link copied: ${fullUrl}`)

        // Also update the button temporarily
        const button = event.target as HTMLButtonElement
        if (button) {
          const originalText = button.innerHTML
          button.innerHTML = '✓ Copied!'
          setTimeout(() => {
            button.innerHTML = originalText
          }, 2000)
        }
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        showError(
          'Copy Failed',
          'Failed to copy the link. Please try again or copy manually from the URL field.'
        )
      }
    },
    [showSuccess, showError]
  )

  const getShortUrl = useCallback((shortCode: string) => {
    if (typeof window === 'undefined') {
      return `/s/${shortCode}` // Fallback for SSR
    }
    return `${window.location.origin}/s/${shortCode}`
  }, [])

  const handleDeleteForm = useCallback(
    async (id: string) => {
      console.log('🎯 Dashboard delete handler called for form:', id)
      const formToDelete = forms.find((f) => f.id === id)
      const formTitle = formToDelete?.title || 'this form'

      console.log('📋 Form to delete:', formToDelete)

      confirm(
        'Delete Form',
        `Are you sure you want to delete "${formTitle}"? This action cannot be undone and will also delete all associated submissions and short URLs.`,
        async () => {
          console.log('✅ User confirmed deletion')
          try {
            console.log('🚀 Calling deleteFormHook...')
            const success = await deleteFormHook(id)
            console.log('📊 Delete result:', success)

            if (success) {
              console.log('🎉 Delete successful, showing success message')
              showSuccess(
                'Form Deleted',
                `"${formTitle}" has been successfully deleted along with all its data.`
              )
            } else {
              console.log('❌ Delete failed, showing error message')
              showError(
                'Delete Failed',
                'Failed to delete the form. Please try again.'
              )
            }
          } catch (error) {
            console.error('💥 Delete error in dashboard handler:', error)
            showError(
              'Delete Failed',
              'An unexpected error occurred while deleting the form.'
            )
          }
        }
      )
    },
    [confirm, showSuccess, showError, deleteFormHook, forms]
  )

  const handleToggleFormActive = useCallback(
    async (id: string, isActive: boolean) => {
      console.log('🔄 Toggling form active status:', id, 'to', isActive)
      const formToToggle = forms.find((f) => f.id === id)
      const formTitle = formToToggle?.title || 'this form'

      try {
        const success = await updateForm(id, { is_active: isActive })

        if (success) {
          showSuccess(
            `Form ${isActive ? 'Activated' : 'Deactivated'}`,
            `"${formTitle}" has been ${
              isActive ? 'activated' : 'deactivated'
            } successfully.`
          )
          console.log('✅ Form status updated successfully')
        } else {
          throw new Error('Update failed')
        }
      } catch (error) {
        console.error('💥 Error toggling form status:', error)
        showError(
          'Update Failed',
          `Failed to ${
            isActive ? 'activate' : 'deactivate'
          } the form. Please try again.`
        )
      }
    },
    [forms, updateForm, showSuccess, showError]
  )

  const getGreeting = () => {
    if (!mounted) return 'Hello' // Fallback for SSR
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const getMotivationalMessage = () => {
    if (forms.length === 0) {
      return "Ready to create your first form? Let's get started!"
    }
    if (forms.length < 3) {
      return "You're off to a great start! Keep building amazing forms."
    }
    if (forms.length < 10) {
      return "Impressive form collection! You're becoming a pro."
    }
    return "Wow! You're a form building expert with an amazing collection."
  }

  if (loading) {
    return (
      <div className="page-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="spinner h-8 w-8 mx-auto mb-4"></div>
            <p className="text-white/60">Loading your dashboard...</p>
            <p className="text-white/40 text-sm mt-2">This should only take a moment</p>
          </div>
        </div>
      </div>
    )
  }

  // Early return if no user data is available
  if (!user) {
    return (
      <div className="page-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-white/60">
              Unable to load user data. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary mt-4">
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {!mounted ? (
              'Welcome! '
            ) : (
              <span suppressHydrationWarning>
                {getGreeting()},{' '}
                {userProfile?.username ||
                  user?.user_metadata?.full_name ||
                  user?.user_metadata?.name ||
                  user?.email?.split('@')[0] ||
                  'there'}
                !
              </span>
            )}
          </h1>
          <p className="text-white/70 text-lg">{getMotivationalMessage()}</p>
        </div>

        {/* Dashboard Stats - Only show if user has forms */}
        {forms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card glow-emerald text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {forms.length}
              </div>
              <div className="text-white/70 text-sm">Total Forms</div>
            </div>
            <div className="card glow-orange text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {dashboardStats.activeForms}
              </div>
              <div className="text-white/70 text-sm">Active Forms</div>
            </div>
            <div className="card glow-amber text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">
                {dashboardStats.totalSubmissions}
              </div>
              <div className="text-white/70 text-sm">Total Submissions</div>
            </div>
            <div className="card glow-cyan text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {dashboardStats.recentActivity}
              </div>
              <div className="text-white/70 text-sm">Recent Activity</div>
            </div>
          </div>
        )}

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {forms.length === 0 ? 'Get Started' : 'Your Forms'}
            </h2>
            {forms.length > 0 && (
              <p className="text-white/60 mt-1">
                Manage your {forms.length} form{forms.length !== 1 ? 's' : ''}{' '}
                and track their performance
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <a href="/create" className="btn btn-primary glow-emerald">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Form
            </a>
            {forms.length > 0 && (
              <a href="/help" className="btn btn-secondary">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Help
              </a>
            )}
          </div>
        </div>

        {/* Forms Content */}
        {forms.length === 0 ? (
          <div className="text-center py-16">
            <div className="card max-w-2xl mx-auto glow-emerald">
              <div className="mb-8">
                <div className="w-24 h-24 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Create Your First Form
                </h3>
                <p className="text-white/70 mb-8 text-lg">
                  Start collecting responses with our AI-powered form builder.
                  It's easy, fast, and completely free to get started!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">AI-Powered</h4>
                  <p className="text-white/60 text-sm">
                    Get smart field suggestions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Lightning Fast
                  </h4>
                  <p className="text-white/60 text-sm">
                    Create forms in minutes
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Real-time Analytics
                  </h4>
                  <p className="text-white/60 text-sm">
                    Track responses instantly
                  </p>
                </div>
              </div>

              <a
                href="/create"
                className="btn btn-primary text-lg px-8 py-4 glow-emerald">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Your First Form
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Quick Actions for existing users */}
            {forms.length >= 3 && (
              <div className="card glow-orange mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      🎉 You're doing great!
                    </h3>
                    <p className="text-white/70">
                      You have {forms.length} forms collecting valuable data.
                      {dashboardStats.totalSubmissions > 0 &&
                        ` You've received ${dashboardStats.totalSubmissions} submissions so far!`}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a href="/create" className="btn btn-primary">
                      Create Another
                    </a>
                    <a href="/help" className="btn btn-secondary">
                      Get Tips
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Forms Grid */}
            <div
              className={`grid gap-6 ${
                forms.length === 1
                  ? 'md:grid-cols-1 max-w-md mx-auto'
                  : forms.length === 2
                  ? 'md:grid-cols-2 max-w-4xl mx-auto'
                  : 'md:grid-cols-2 lg:grid-cols-3'
              }`}>
              {forms.map((form) => (
                <FormCard
                  key={form.id}
                  form={form}
                  mounted={mounted}
                  onCopyLink={copyToClipboard}
                  onDelete={handleDeleteForm}
                  onToggleActive={handleToggleFormActive}
                  getShortUrl={getShortUrl}
                />
              ))}
            </div>

            {/* Tips for users with few forms */}
            {forms.length < 5 && (
              <div className="mt-12 card glow-amber">
                <h3 className="text-lg font-semibold text-white mb-4">
                  💡 Pro Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Boost Response Rates
                    </h4>
                    <p className="text-white/70 text-sm">
                      Keep forms short and use clear, engaging questions to get
                      more responses.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Use AI Suggestions
                    </h4>
                    <p className="text-white/70 text-sm">
                      Let our AI help you create better forms with smart field
                      recommendations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Share Easily
                    </h4>
                    <p className="text-white/70 text-sm">
                      Use the short URLs to share your forms on social media and
                      emails.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Track Performance
                    </h4>
                    <p className="text-white/70 text-sm">
                      Monitor submissions and export data to analyze your
                      results.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
