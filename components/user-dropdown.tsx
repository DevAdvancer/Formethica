'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useConfirmation } from '@/lib/confirmation-context'
import { PersonIcon, ExitIcon, LockClosedIcon, Pencil1Icon, EyeOpenIcon, EyeNoneIcon, ArrowLeftIcon } from '@radix-ui/react-icons'
import { UserService } from '@/lib/user-service'
import { supabase } from '@/lib/supabase'

export default function UserDropdown() {
  const { user, userProfile, signOut, refreshUserProfile } = useAuth()
  const { showInfo } = useConfirmation()
  const [isOpen, setIsOpen] = useState(false)
  const [showUsernameEdit, setShowUsernameEdit] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [editUsername, setEditUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (userProfile) {
      setEditUsername(userProfile.username)
    }
  }, [userProfile])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowUsernameEdit(false)
        setShowChangePassword(false)
        setError('')
        resetPasswordForm()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const resetPasswordForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError('')
    setPasswordSuccess('')
    setShowCurrentPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
  }

  const handleSaveUsername = async () => {
    if (!user?.email || !editUsername.trim()) return

    setIsLoading(true)
    setError('')

    const result = await UserService.updateUsername(user.email, editUsername.trim())

    if (result.success) {
      await refreshUserProfile()
      setShowUsernameEdit(false)
    } else {
      setError(result.error || 'Failed to update username')
    }

    setIsLoading(false)
  }

  const handleChangePassword = async () => {
    setPasswordError('')
    setPasswordSuccess('')

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required')
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }

    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from current password')
      return
    }

    setPasswordLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        setPasswordError(error.message)
      } else {
        setPasswordSuccess('Password updated successfully!')
        resetPasswordForm()
        setTimeout(() => {
          setShowChangePassword(false)
          setPasswordSuccess('')
        }, 2000)
      }
    } catch (error) {
      setPasswordError('An unexpected error occurred')
    } finally {
      setPasswordLoading(false)
    }
  }

  if (!user || !userProfile) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 glass px-3 py-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
      >
        <PersonIcon className="w-4 h-4 text-white/80" />
        <span className="text-white/90 text-sm font-medium">{userProfile.username}</span>
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
        <div className="absolute right-0 mt-2 w-80 glass-dropdown rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          {!showChangePassword ? (
            <>
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <PersonIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-white font-medium">{userProfile.username}</p>
                      {userProfile.canChangeUsername && (
                        <button
                          onClick={() => setShowUsernameEdit(true)}
                          className="p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                        >
                          <Pencil1Icon className="w-3 h-3 text-white/60 hover:text-white" />
                        </button>
                      )}
                    </div>
                    <p className="text-white/60 text-sm truncate">{user.email}</p>
                    <p className="text-white/40 text-xs mt-1">
                      {userProfile.canChangeUsername ? '1 username change remaining' : 'No username changes remaining'}
                    </p>
                  </div>
                </div>

                {showUsernameEdit && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm cursor-text disabled:cursor-not-allowed"
                        placeholder="Enter new username"
                        maxLength={20}
                      />
                      {error && (
                        <p className="text-red-400 text-xs mt-1">{error}</p>
                      )}
                      <p className="text-white/60 text-xs mt-1">
                        You can only change your username once. Choose carefully!
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setShowUsernameEdit(false)
                          setEditUsername(userProfile.username)
                          setError('')
                        }}
                        disabled={isLoading}
                        className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveUsername}
                        disabled={!editUsername.trim() || isLoading || editUsername === userProfile.username}
                        className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        {isLoading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2">
                <button
                  onClick={() => setShowChangePassword(true)}
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
                  className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                >
                  <ExitIcon className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <LockClosedIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white font-medium">Change Password</h3>
                </div>
                <button
                  onClick={() => {
                    setShowChangePassword(false)
                    resetPasswordForm()
                  }}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Current Password */}
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={passwordLoading}
                      className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm cursor-text disabled:cursor-not-allowed"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {showCurrentPassword ? (
                        <EyeNoneIcon className="w-4 h-4" />
                      ) : (
                        <EyeOpenIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={passwordLoading}
                      className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm cursor-text disabled:cursor-not-allowed"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {showNewPassword ? (
                        <EyeNoneIcon className="w-4 h-4" />
                      ) : (
                        <EyeOpenIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={passwordLoading}
                      className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm cursor-text disabled:cursor-not-allowed"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeNoneIcon className="w-4 h-4" />
                      ) : (
                        <EyeOpenIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error/Success Messages */}
                {passwordError && (
                  <div className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-xs">{passwordError}</p>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                    <p className="text-emerald-400 text-xs">{passwordSuccess}</p>
                  </div>
                )}

                <p className="text-white/60 text-xs">
                  Password must be at least 6 characters long
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => {
                      setShowChangePassword(false)
                      resetPasswordForm()
                    }}
                    disabled={passwordLoading}
                    className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
                    className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {passwordLoading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}


    </div>
  )
}
