'use client'

import { memo, useCallback } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useAuthModal } from '@/lib/auth-modal-context'
import { FileText } from 'lucide-react'
import UserDropdown from './user-dropdown'

const Navigation = memo(function Navigation() {
  const { user, loading } = useAuth()
  const { openModal } = useAuthModal()

  const handleSignIn = useCallback(() => {
    openModal('sign_in')
  }, [openModal])

  const handleSignUp = useCallback(() => {
    openModal('sign_up')
  }, [openModal])

  return (
    <nav className="nav-glass">
      <div className="px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer">
              <FileText className="h-8 w-8 text-emerald-400" />
              <h1 className="text-xl font-bold text-white/90">
                Formethica
              </h1>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="spinner h-6 w-6"></div>
            ) : user ? (
              <>
                <a
                  href="/"
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Dashboard
                </a>
                <UserDropdown />
              </>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
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
})

export default Navigation
