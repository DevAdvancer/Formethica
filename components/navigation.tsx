'use client'

import { useAuth } from '@/lib/auth-context'
import { useAuthModal } from '@/lib/auth-modal-context'
import { FileText } from 'lucide-react'
import UserDropdown from './user-dropdown'

export default function Navigation() {
  const { user, loading } = useAuth()
  const { openModal } = useAuthModal()

  if (loading) {
    return (
      <nav className="nav-glass">
        <div className="px-6">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-emerald-400" />
                <h1 className="text-xl font-bold text-white/90">
                  FormCraft AI
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="spinner h-6 w-6"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="nav-glass">
      <div className="px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <FileText className="h-8 w-8 text-emerald-400" />
              <h1 className="text-xl font-bold text-white/90">
                FormCraft AI
              </h1>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <a
                  href="/"
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Dashboard
                </a>
                <UserDropdown />
              </>
            ) : (
              <>
                <button
                  onClick={() => openModal('sign_in')}
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openModal('sign_up')}
                  className="btn btn-primary"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
