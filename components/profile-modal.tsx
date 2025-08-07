'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Cross2Icon, PersonIcon } from '@radix-ui/react-icons'
import { UserService } from '@/lib/user-service'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, userProfile, refreshUserProfile } = useAuth()
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username)
    }
  }, [userProfile])

  if (!isOpen || !user || !userProfile) return null

  const handleSave = async () => {
    if (!user.email || !username.trim()) return

    setIsLoading(true)
    setError('')

    const result = await UserService.updateUsername(user.email, username.trim())

    if (result.success) {
      await refreshUserProfile()
      onClose()
    } else {
      setError(result.error || 'Failed to update username')
    }

    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md">
        <div className="card glow-emerald">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded cursor-pointer"
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
                <h3 className="text-white font-medium text-lg">{userProfile.username}</h3>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!userProfile.canChangeUsername || isLoading}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-text"
                placeholder="Enter your username"
                maxLength={20}
              />
              {error && (
                <p className="text-red-400 text-xs mt-2">{error}</p>
              )}
              {userProfile.canChangeUsername ? (
                <p className="text-gray-400 text-xs mt-2">
                  You can change your username once. Choose carefully!
                </p>
              ) : (
                <p className="text-gray-400 text-xs mt-2">
                  Username was changed on {new Date(userProfile.usernameChangedAt!).toLocaleDateString()}. It cannot be changed again.
                </p>
              )}
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
              disabled={isLoading}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!username.trim() || !userProfile.canChangeUsername || isLoading || username === userProfile.username}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
