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
    <div className="modal-backdrop flex items-center justify-center p-4 z-50">
      <div className="modal-content p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
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
              <h3 className="text-white font-medium">{username}</h3>
              <p className="text-white/60 text-sm">{user.email}</p>
            </div>
          </div>

          <div>
            <label className="form-label">Display Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your display name"
              maxLength={20}
            />
            <p className="text-white/60 text-xs mt-1">
              This is how your name will appear in the app
            </p>
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={user.email || ''}
              className="form-input opacity-50 cursor-not-allowed"
              disabled
            />
            <p className="text-white/60 text-xs mt-1">
              Email cannot be changed
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            disabled={!username.trim()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
