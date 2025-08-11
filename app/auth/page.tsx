'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import AuthForm from '@/components/auth/auth-form'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'

function AuthPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in')

  useEffect(() => {
    const authType = searchParams.get('type')
    if (authType === 'signup') {
      setView('sign_up')
    } else {
      setView('sign_in')
    }
  }, [searchParams])

  // Redirect authenticated users to home page
  useEffect(() => {
    if (!loading && user) {
      router.replace('/')
    }
  }, [user, loading, router])

  // Show loading while checking auth state
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

  // Don't render auth form if user is already authenticated
  if (user) {
    return null
  }

  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with enterprise-grade security.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create and deploy forms in minutes, not hours.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together with your team to build better forms.'
    }
  ]

  return (
    <div className="page-content flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        {/* Main Auth Card */}
        <div className="glass rounded-3xl overflow-hidden glow-emerald">
          <div className="flex flex-col lg:flex-row min-h-[600px]">

            {/* Left Side - Description */}
            <div className="lg:w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-cyan-600/20 to-blue-600/20" />
              <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-16 h-full">
                <div className="max-w-lg mx-auto lg:mx-0">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      Formethica
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-white/80 mb-8 lg:mb-12 leading-relaxed">
                    Create intelligent, ethical forms that respect user privacy and deliver exceptional experiences.
                  </p>

                  <div className="space-y-6 lg:space-y-8">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl glass flex items-center justify-center">
                            <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-white mb-1 lg:mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-sm lg:text-base text-white/70 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 lg:mt-12 flex items-center text-white/60">
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    <span className="text-sm">Join thousands of satisfied users</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
              <div className="w-full max-w-md">
                {/* Auth Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    {view === 'sign_in' ? 'Welcome Back' : 'Get Started'}
                  </h2>
                  <p className="text-white/70 text-sm lg:text-base">
                    {view === 'sign_in' ? (
                      <>
                        Sign in to your account or{' '}
                        <button
                          onClick={() => setView('sign_up')}
                          className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors underline cursor-pointer"
                        >
                          create a new account
                        </button>
                      </>
                    ) : (
                      <>
                        Create your account or{' '}
                        <button
                          onClick={() => setView('sign_in')}
                          className="font-medium text-orange-400 hover:text-orange-300 transition-colors underline cursor-pointer"
                        >
                          sign in to existing account
                        </button>
                      </>
                    )}
                  </p>
                </div>

                <AuthForm view={view} />

                <div className="text-center mt-8 text-white/60 text-xs lg:text-sm">
                  <p>
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="text-emerald-400 hover:text-emerald-300 underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="spinner h-12 w-12 mx-auto mb-4"></div>
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  )
}
