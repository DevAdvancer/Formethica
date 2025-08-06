'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import AuthForm from './auth-form'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: 'sign_in' | 'sign_up'
}

export default function AuthModal({ isOpen, onClose, initialView = 'sign_in' }: AuthModalProps) {
  const [view, setView] = useState<'sign_in' | 'sign_up'>(initialView)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md">
        <div className="card glow-emerald">
          {/* Header */}
          <div className="flex justify-between items-center p-6 pb-4">
            <h2 className="text-2xl font-bold text-white">
              {view === 'sign_in' ? 'Welcome Back' : 'Join FormCraft AI'}
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <p className="text-white/80 mb-6">
              {view === 'sign_in' ? (
                <>
                  Sign in to your account or{' '}
                  <button
                    onClick={() => setView('sign_up')}
                    className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors underline"
                  >
                    create a new account
                  </button>
                </>
              ) : (
                <>
                  Create your account or{' '}
                  <button
                    onClick={() => setView('sign_in')}
                    className="font-medium text-orange-400 hover:text-orange-300 transition-colors underline"
                  >
                    sign in to existing account
                  </button>
                </>
              )}
            </p>

            <AuthForm view={view} />
          </div>
        </div>
      </div>
    </div>
  )
}
