import { supabase } from './supabase'

export class SessionManager {
  private static refreshTimer: NodeJS.Timeout | null = null
  private static isRefreshing = false

  /**
   * Setup automatic token refresh
   */
  static setupAutoRefresh() {
    // Clear existing timer
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
    }

    // Check session every 30 minutes
    this.refreshTimer = setInterval(async () => {
      await this.checkAndRefreshSession()
    }, 30 * 60 * 1000) // 30 minutes
  }

  /**
   * Check current session and refresh if needed
   */
  static async checkAndRefreshSession() {
    if (this.isRefreshing) return

    try {
      this.isRefreshing = true

      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error getting session:', error)
        return
      }

      if (!session) {
        console.log('No active session found')
        return
      }

      // Check if token expires within next 15 minutes
      const expiresAt = session.expires_at ? session.expires_at * 1000 : 0
      const timeUntilExpiry = expiresAt - Date.now()
      const fifteenMinutes = 15 * 60 * 1000

      if (timeUntilExpiry < fifteenMinutes) {
        console.log('Token expiring soon, refreshing...')
        const { data: { session: newSession }, error: refreshError } = await supabase.auth.refreshSession()

        if (refreshError) {
          console.error('Token refresh failed:', refreshError)
        } else if (newSession) {
          console.log('Token refreshed successfully')
        }
      }
    } catch (error) {
      console.error('Session check failed:', error)
    } finally {
      this.isRefreshing = false
    }
  }

  /**
   * Clear refresh timer
   */
  static clearAutoRefresh() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  /**
   * Force refresh current session
   */
  static async forceRefresh() {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()

      if (error) {
        console.error('Force refresh failed:', error)
        return null
      }

      return session
    } catch (error) {
      console.error('Force refresh error:', error)
      return null
    }
  }

  /**
   * Get session expiry info
   */
  static async getSessionInfo() {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return null

    const expiresAt = session.expires_at ? session.expires_at * 1000 : 0
    const timeUntilExpiry = expiresAt - Date.now()

    return {
      session,
      expiresAt: new Date(expiresAt),
      timeUntilExpiry,
      expiresInMinutes: Math.floor(timeUntilExpiry / (60 * 1000))
    }
  }
}
