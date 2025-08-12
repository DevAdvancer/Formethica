'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { UserService, UserProfile } from './user-service'
import { SessionManager } from './session-manager'
import { cacheManager } from './cache-manager'

interface AuthContextType {
  user: User | null
  session: Session | null
  userProfile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const USER_PROFILE_CACHE_KEY = 'user-profile'
const USER_PROFILE_CACHE_DURATION = 300000 // 5 minutes
const SESSION_CHECK_INTERVAL = 600000 // 10 minutes (reduced from 30 minutes)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  // Optimized user profile fetching with caching
  const fetchUserProfile = useCallback(async (email: string, useCache = true) => {
    try {
      // Check cache first
      const cacheKey = `${USER_PROFILE_CACHE_KEY}-${email}`
      if (useCache && cacheManager.has(cacheKey)) {
        const cachedProfile = cacheManager.get<UserProfile>(cacheKey)
        if (cachedProfile) {
          setUserProfile(cachedProfile)
          return cachedProfile
        }
      }

      setProfileLoading(true)
      const profile = await UserService.getOrCreateUser(email)

      if (profile) {
        setUserProfile(profile)
        // Cache the profile
        cacheManager.set(cacheKey, profile, USER_PROFILE_CACHE_DURATION)
      }

      return profile
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setUserProfile(null)
      return null
    } finally {
      setProfileLoading(false)
    }
  }, [])

  // Refresh user profile (bypass cache)
  const refreshUserProfile = useCallback(async () => {
    if (user?.email) {
      const cacheKey = `${USER_PROFILE_CACHE_KEY}-${user.email}`
      cacheManager.delete(cacheKey) // Clear cache
      await fetchUserProfile(user.email, false)
    }
  }, [user?.email, fetchUserProfile])

  useEffect(() => {
    let isMounted = true
    let sessionCheckInterval: NodeJS.Timeout

    // Optimized initialization
    const initializeAuth = async () => {
      try {
        // Check localStorage first for faster initial load
        const cachedSession = localStorage.getItem('sb-session')
        if (cachedSession) {
          try {
            const parsedSession = JSON.parse(cachedSession)
            if (parsedSession && parsedSession.access_token) {
              // Set user immediately from cache for faster UI
              setUser(parsedSession.user || null)
            }
          } catch (e) {
            // Invalid cached session, ignore
          }
        }

        // Get actual session from Supabase
        const { data: { session }, error } = await supabase.auth.getSession()

        if (!isMounted) return

        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }

        setSession(session)
        setUser(session?.user ?? null)

        // Only fetch profile if we have a user and don't already have profile data
        if (session?.user?.email && !userProfile) {
          await fetchUserProfile(session.user.email)
        }

        // Set up session management
        if (session) {
          SessionManager.setupAutoRefresh()
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

    // Listen for auth changes (debounced)
    let authChangeTimeout: NodeJS.Timeout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      // Debounce auth changes to prevent rapid fire updates
      clearTimeout(authChangeTimeout)
      authChangeTimeout = setTimeout(async () => {
        if (!isMounted) return

        console.log('Auth state change:', event, !!session?.user)

        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user?.email) {
          // Only fetch profile on specific events, not all auth changes
          if (event === 'SIGNED_IN' || (event === 'TOKEN_REFRESHED' && !userProfile)) {
            await fetchUserProfile(session.user.email)
          }

          // Setup session management for new sessions
          if (event === 'SIGNED_IN' && session) {
            SessionManager.setupAutoRefresh()
          }
        } else {
          setUserProfile(null)
          // Clear all caches when signed out
          cacheManager.clear()
          SessionManager.clearAutoRefresh()
        }

        setLoading(false)
      }, 100) // 100ms debounce
    })

    // Periodic session check (reduced frequency)
    sessionCheckInterval = setInterval(() => {
      if (session && !loading) {
        SessionManager.checkAndRefreshSession()
      }
    }, SESSION_CHECK_INTERVAL)

    return () => {
      isMounted = false
      SessionManager.clearAutoRefresh()
      subscription.unsubscribe()
      clearTimeout(authChangeTimeout)
      clearInterval(sessionCheckInterval)
    }
  }, [fetchUserProfile, userProfile, session, loading])

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      setUserProfile(null)
      // Clear all caches on sign out
      cacheManager.clear()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }, [])

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    session,
    userProfile,
    loading: loading || profileLoading,
    signOut,
    refreshUserProfile
  }), [user, session, userProfile, loading, profileLoading, signOut, refreshUserProfile])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
