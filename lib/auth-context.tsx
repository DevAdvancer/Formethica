'use client'

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { UserService, UserProfile } from './user-service'

interface AuthContextType {
  user: User | null
  session: Session | null
  userProfile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  userProfile: null,
  loading: true,
  signOut: async () => {},
  refreshUserProfile: async () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Memoize the user profile fetching function to prevent recreating it
  const fetchUserProfile = useCallback(async (email: string) => {
    try {
      const profile = await UserService.getOrCreateUser(email)
      setUserProfile(profile)
      return profile
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setUserProfile(null)
      return null
    }
  }, [])

  const refreshUserProfile = useCallback(async () => {
    if (user?.email) {
      await fetchUserProfile(user.email)
    }
  }, [user?.email, fetchUserProfile])

  useEffect(() => {
    let isMounted = true

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!isMounted) return

        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user?.email) {
          await fetchUserProfile(session.user.email)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      console.log('Auth state change:', event, !!session?.user)

      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user?.email) {
        // Only fetch profile on sign_in or token_refreshed, not on every change
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await fetchUserProfile(session.user.email)
        }
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [fetchUserProfile])

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      setUserProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }, [])

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    session,
    userProfile,
    loading,
    signOut,
    refreshUserProfile
  }), [user, session, userProfile, loading, signOut, refreshUserProfile])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
