'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { UserService } from '@/lib/user-service'

interface AuthFormProps {
  view?: 'sign_in' | 'sign_up'
}

export default function AuthForm({ view = 'sign_in' }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const validateUsername = (username: string): string | null => {
    if (username.length < 3) return 'Username must be at least 3 characters long'
    if (username.length > 20) return 'Username must be less than 20 characters'
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores'
    if (/^[0-9]/.test(username)) return 'Username cannot start with a number'
    return null
  }

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    return !data // Returns true if username is available (no data found)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      // Validate username
      const usernameError = validateUsername(username)
      if (usernameError) {
        setError(usernameError)
        setLoading(false)
        return
      }

      // Check username availability
      const isAvailable = await checkUsernameAvailability(username)
      if (!isAvailable) {
        setError('Username is already taken. Please choose another one.')
        setLoading(false)
        return
      }

      // Sign up with Supabase Auth, passing username in metadata
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username
          }
        }
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      // The trigger will automatically create the user profile
      if (data.user) {
        setMessage('Account created successfully! Please check your email to verify your account.')

        // Clear form
        setEmail('')
        setPassword('')
        setUsername('')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      // Success - user will be redirected by auth context
    } catch (error) {
      console.error('Signin error:', error)
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={view === 'sign_up' ? handleSignUp : handleSignIn} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-white/90 font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full glass text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50 px-4 py-3 rounded-xl border border-white/20 focus:border-emerald-400/50 transition-colors"
            placeholder="Enter your email"
          />
        </div>

        {/* Username Field (only for signup) */}
        {view === 'sign_up' && (
          <div>
            <label htmlFor="username" className="block text-white/90 font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              className="w-full glass text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50 px-4 py-3 rounded-xl border border-white/20 focus:border-emerald-400/50 transition-colors"
              placeholder="Choose a username"
            />
            <p className="text-white/60 text-sm mt-1">
              3-20 characters, letters, numbers, and underscores only
            </p>
          </div>
        )}

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-white/90 font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full glass text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50 px-4 py-3 rounded-xl border border-white/20 focus:border-emerald-400/50 transition-colors"
            placeholder="Enter your password"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="text-emerald-400 text-sm bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-3">
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full glass hover:bg-white/20 transition-all duration-300 transform hover:scale-105 px-4 py-3 rounded-xl border border-white/20 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="spinner h-5 w-5 mr-2"></div>
              {view === 'sign_up' ? 'Creating Account...' : 'Signing In...'}
            </div>
          ) : (
            view === 'sign_up' ? 'Create Account' : 'Sign In'
          )}
        </button>
      </form>
    </div>
  )
}
