'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Form } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { Pencil1Icon, TrashIcon, Share2Icon, BarChartIcon, CalendarIcon } from '@radix-ui/react-icons'
import { useAuth } from '@/lib/auth-context'
import { useAuthModal } from '@/lib/auth-modal-context'
import { useConfirmation } from '@/lib/confirmation-context'
import ProtectedRoute from '@/components/protected-route'

function WelcomePage() {
  const { openModal } = useAuthModal()

  useEffect(() => {
    // Check URL parameters to auto-open auth modal
    const urlParams = new URLSearchParams(window.location.search)
    const authParam = urlParams.get('auth')

    if (authParam === 'login') {
      openModal('sign_in')
      // Clean up URL
      window.history.replaceState({}, '', '/')
    } else if (authParam === 'signup') {
      openModal('sign_up')
      // Clean up URL
      window.history.replaceState({}, '', '/')
    }
  }, [openModal])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold solid-text-emerald mb-6 leading-tight">
              Forms Made
              <br />
              <span className="solid-text-orange">Beautiful</span>
            </h1>
            <p className="text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Create stunning forms with AI assistance, collect responses effortlessly, and manage your data with our modern glassmorphism interface
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button
              onClick={() => openModal('sign_up')}
              className="btn btn-primary text-xl px-12 py-5 glow-emerald"
            >
              Start Creating Free
            </button>
            <button
              onClick={() => openModal('sign_in')}
              className="btn btn-secondary text-xl px-12 py-5"
            >
              Sign In
            </button>
          </div>

          {/* Demo Preview */}
          <div className="card glow-emerald max-w-4xl mx-auto mb-20">
            <div className="aspect-video bg-gradient-to-br from-emerald-900/20 to-orange-900/20 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Interactive Demo</h3>
                <p className="text-white/70">See how easy it is to create forms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why Choose FORMCRAFT AI?</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Powered by AI and designed for modern workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card glow-emerald text-center">
              <div className="text-emerald-400 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered</h3>
              <p className="text-white/70 text-lg">Get intelligent field suggestions and chat with our AI assistant to create better forms faster.</p>
            </div>

            <div className="card glow-orange text-center">
              <div className="text-orange-400 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Real-time Analytics</h3>
              <p className="text-white/70 text-lg">Track responses in real-time with beautiful charts and export data to Excel or CSV instantly.</p>
            </div>

            <div className="card glow-amber text-center">
              <div className="text-amber-400 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Secure & Private</h3>
              <p className="text-white/70 text-lg">Your data is encrypted and secure. GDPR compliant with advanced privacy controls.</p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-4xl font-bold text-white mb-6">Smart Form Builder</h3>
              <ul className="space-y-4 text-lg text-white/80">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></span>
                  AI suggests relevant fields based on your form title
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-4"></span>
                  Drag and drop interface for easy customization
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-4"></span>
                  Multiple field types: text, email, select, radio, checkbox
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-4"></span>
                  Real-time preview and validation
                </li>
              </ul>
            </div>
            <div className="card glow-orange">
              <div className="aspect-square bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v-1a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <p className="text-white/70">Form Builder Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card glow-emerald">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of users who trust FORMCRAFT AI for their data collection needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openModal('sign_up')}
                className="btn btn-primary text-xl px-10 py-4 glow-emerald"
              >
                Create Your First Form
              </button>
              <button
                onClick={() => openModal('sign_in')}
                className="btn btn-secondary text-xl px-10 py-4"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface FormWithSubmissions extends Form {
  submission_count: number
}

function DashboardContent() {
  const { user } = useAuth()
  const { confirm, showSuccess, showError } = useConfirmation()
  const [forms, setForms] = useState<FormWithSubmissions[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchForms()
    }
  }, [user])

  const fetchForms = async () => {
    try {
      // Fetch forms with submission counts
      const { data, error } = await supabase
        .from('forms')
        .select(`
          *,
          form_submissions(count)
        `)
        .eq('user_id', user?.id || '')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform the data to include submission count
      const formsWithCounts = (data || []).map(form => ({
        ...form,
        submission_count: form.form_submissions?.[0]?.count || 0
      })) as unknown as FormWithSubmissions[]

      setForms(formsWithCounts)
    } catch (error) {
      console.error('Error fetching forms:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Show a temporary success message
    const button = event?.target as HTMLButtonElement
    if (button) {
      const originalText = button.innerHTML
      button.innerHTML = 'Copied!'
      setTimeout(() => {
        button.innerHTML = originalText
      }, 2000)
    }
  }

  const getShortUrl = (shortCode: string) => {
    return `${window.location.origin}/s/${shortCode}`
  }

  const deleteForm = async (id: string) => {
    confirm(
      'Delete Form',
      'Are you sure you want to delete this form? This action cannot be undone and will also delete all associated submissions.',
      async () => {
        try {
          const { error } = await supabase
            .from('forms')
            .delete()
            .eq('id', id)

          if (error) {
            showError('Delete Failed', `Failed to delete the form: ${error.message}`)
            throw error
          }

          setForms(forms.filter(form => form.id !== id))
          showSuccess('Form Deleted', 'The form has been successfully deleted.')
        } catch (error) {
          console.error('Error deleting form:', error)
        }
      }
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="spinner h-8 w-8 mx-auto mb-4"></div>
          <p className="text-white/60">Loading your forms...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          My Forms
        </h1>
        <a href="/create" className="btn btn-primary glow-emerald">
          Create Form
        </a>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-16">
          <div className="card max-w-md mx-auto">
            <h3 className="text-xl font-medium text-white mb-4">No forms yet</h3>
            <p className="text-white/70 mb-6">Create your first form to get started collecting responses</p>
            <a href="/create" className="btn btn-primary glow-emerald">
              Create Your First Form
            </a>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <div key={form.id} className="card group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
                  {form.title}
                </h3>
                <span className={form.is_active ? 'badge-active' : 'badge-inactive'}>
                  {form.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {form.description && (
                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {form.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="glass-dark rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <BarChartIcon className="w-4 h-4 text-emerald-400 mr-1" />
                    <span className="text-xs text-white/60">Responses</span>
                  </div>
                  <div className="text-lg font-semibold text-white">{form.submission_count || 0}</div>
                </div>
                <div className="glass-dark rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <CalendarIcon className="w-4 h-4 text-orange-400 mr-1" />
                    <span className="text-xs text-white/60">Fields</span>
                  </div>
                  <div className="text-lg font-semibold text-white">{form.fields.length}</div>
                </div>
              </div>

              <div className="text-sm text-white/60 mb-4">
                <p className="flex items-center">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  Created {formatDate(form.created_at || '')}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/60">Share Form:</span>
                  <button
                    onClick={() => copyToClipboard(getShortUrl(form.short_url))}
                    className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Share2Icon className="w-4 h-4" />
                    <span>Copy Link</span>
                  </button>
                </div>
                <code className="glass px-3 py-2 rounded-lg text-xs block truncate text-white/80">
                  {getShortUrl(form.short_url)}
                </code>
              </div>

              <div className="flex space-x-2">
                <a
                  href={`/submissions/${form.id}`}
                  className="flex-1 btn btn-primary text-center text-sm glow-emerald"
                >
                  <BarChartIcon className="w-4 h-4 inline mr-1" />
                  View Responses
                </a>
                <a
                  href={`/edit/${form.id}`}
                  className="btn btn-secondary text-sm"
                >
                  <Pencil1Icon className="w-4 h-4" />
                </a>
                <button
                  onClick={() => deleteForm(form.id)}
                  className="btn btn-danger text-sm"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <WelcomePage />
  }

  return <DashboardContent />
}
