'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useConfirmation } from '@/lib/confirmation-context'
import { PersonIcon, ExitIcon, GearIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { getStoredUsername } from '@/lib/user-utils'
import ProfileModal from './profile-modal'

export default function UserDropdown() {
  const { user, signOut } = useAuth()
  const { showInfo } = useConfirmation()
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [showProfileModal, setShowProfileModal] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user?.email) {
      setUsername(getStoredUsername(user.email))
    }
  }, [user?.email])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 glass px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
      >
        <PersonIcon className="w-4 h-4 text-white/80" />
        <span className="text-white/90 text-sm font-medium">{username}</span>
        <svg
          className={`w-4 h-4 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 glass-dropdown rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <PersonIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{username}</p>
                <p className="text-white/60 text-sm truncate">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                setIsOpen(false)
                setShowProfileModal(true)
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <GearIcon className="w-4 h-4" />
              <span>Account Settings</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false)
                showInfo('Coming Soon', 'Password change functionality will be available in a future update.')
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LockClosedIcon className="w-4 h-4" />
              <span>Change Password</span>
            </button>

            <div className="border-t border-white/10 my-2"></div>

            <button
              onClick={() => {
                setIsOpen(false)
                signOut()
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <ExitIcon className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  )
}
