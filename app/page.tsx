'use client'

import { useEffect, useState, useCallback } from 'react'
import OptimizedImage from '@/components/optimized-image'
import { supabase } from '@/lib/supabase'
import { Form } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { Pencil1Icon, TrashIcon, Share2Icon, BarChartIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Check, Sparkles, Star } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useAuthModal } from '@/lib/auth-modal-context'
import { useConfirmation } from '@/lib/confirmation-context'
import { useForms } from '@/lib/hooks/use-forms'
import ProtectedRoute from '@/components/protected-route'
import FormCard from '@/components/form-card'

function WelcomePage() {
  const { openModal } = useAuthModal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

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
  }, [openModal, mounted])

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
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why Choose FORMETHICA?</h2>
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
              <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Form Builder</h3>
              <p className="text-white/70 text-lg">Get intelligent field suggestions based on your form title. Our AI chatbot helps you create better forms faster with smart recommendations.</p>
            </div>

            <div className="card glow-orange text-center">
              <div className="text-orange-400 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Real-time Analytics</h3>
              <p className="text-white/70 text-lg">Track form submissions in real-time with beautiful analytics dashboard. Export responses to Excel or CSV with one click.</p>
            </div>

            <div className="card glow-amber text-center">
              <div className="text-amber-400 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Easy Sharing</h3>
              <p className="text-white/70 text-lg">Share your forms instantly with automatically generated short URLs. Copy links with one click and start collecting responses immediately.</p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-4xl font-bold text-white mb-6">Complete Form Solution</h3>
              <ul className="space-y-4 text-lg text-white/80">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></span>
                  Multiple field types: text, email, number, select, radio, checkbox, textarea
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-4"></span>
                  Drag and drop interface for easy form customization
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-4"></span>
                  Real-time form validation and required field controls
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-4"></span>
                  Secure data collection with user authentication
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-4"></span>
                  Form activation/deactivation controls
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-4"></span>
                  Detailed submission tracking and management
                </li>
              </ul>
            </div>
            <div className="card glow-orange">
              <div className="aspect-square rounded-xl overflow-hidden">
                <OptimizedImage
                  src="/sampleForm.png"
                  alt="Form Builder Interface - FORMETHICA"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="solid-text-emerald">Simple</span> Pricing Plans
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Currently in public preview. All pricing plans coming soon!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Free Plan */}
            <div className="card glow-emerald">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">Coming Soon</span>
                </div>
                <p className="text-white/70">Perfect for getting started</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-white">Up to 3 form creations</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Unlimited submissions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">AI-powered suggestions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Export to Excel/CSV</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Basic analytics</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-700 text-white/60 py-3 px-6 rounded-lg cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            </div>

            {/* Pro Plan */}
            <div className="card glow-orange">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">Coming Soon</span>
                </div>
                <p className="text-white/70">For power users</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-white">Up to 30 form creations</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Email notifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Custom branding removal</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-700 text-white/60 py-3 px-6 rounded-lg cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            </div>

            {/* Max Plan */}
            <div className="card glow-amber">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Max</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">Coming Soon</span>
                </div>
                <p className="text-white/70">For teams & unlimited creativity</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-white">Up to 50 form creations</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Deletions don't affect limit</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Team collaboration</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">API access</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Dedicated support</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-700 text-white/60 py-3 px-6 rounded-lg cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
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
              Join thousands of users who trust FORMETHICA for their data collection needs
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
  const { confirm, showSuccess, showError } = useConfirmation()
  const { forms, loading, error, deleteForm: deleteFormHook } = useForms()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show error if there's one from the hook
  useEffect(() => {
    if (error) {
      showError('Error', error)
    }
  }, [error, showError])

  const copyToClipboard = useCallback((text: string, event: React.MouseEvent) => {
    if (typeof window === 'undefined' || !navigator.clipboard) {
      return
    }

    navigator.clipboard.writeText(text)
    // Show a temporary success message
    const button = event.target as HTMLButtonElement
    if (button) {
      const originalText = button.innerHTML
      button.innerHTML = 'Copied!'
      setTimeout(() => {
        button.innerHTML = originalText
      }, 2000)
    }
  }, [])

  const getShortUrl = useCallback((shortCode: string) => {
    if (typeof window === 'undefined') {
      return `/s/${shortCode}` // Fallback for SSR
    }
    return `${window.location.origin}/s/${shortCode}`
  }, [])

  const handleDeleteForm = useCallback(async (id: string) => {
    confirm(
      'Delete Form',
      'Are you sure you want to delete this form? This action cannot be undone and will also delete all associated submissions.',
      async () => {
        const success = await deleteFormHook(id)
        if (success) {
          showSuccess('Form Deleted', 'The form has been successfully deleted.')
        } else {
          showError('Delete Failed', 'Failed to delete the form. Please try again.')
        }
      }
    )
  }, [confirm, showSuccess, showError, deleteFormHook])

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
            <FormCard
              key={form.id}
              form={form}
              mounted={mounted}
              onCopyLink={copyToClipboard}
              onDelete={handleDeleteForm}
              getShortUrl={getShortUrl}
            />
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
