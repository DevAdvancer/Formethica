'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Cross2Icon, PersonIcon } from '@radix-ui/react-icons'
import { getStoredUsername } from '@/lib/user-utils'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useAuth()
  const [username, setUsername] = useState(() =>
    user?.email ? getStoredUsername(user.email) : ''
  )

  if (!isOpen || !user) return null

  const handleSave = () => {
    if (user.email && username.trim()) {
      localStorage.setItem(`username_${user.email}`, username.trim())
      onClose()
      // Refresh the page to update the username in the dropdown
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <div
        className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl shadow-2xl"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                <PersonIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">{username}</h3>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Display Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="Enter your display name"
                maxLength={20}
              />
              <p className="text-gray-400 text-xs mt-2">
                This is how your name will appear in the app
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                value={user.email || ''}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 cursor-not-allowed"
                disabled
              />
              <p className="text-gray-400 text-xs mt-2">
                Email cannot be changed
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!username.trim()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
