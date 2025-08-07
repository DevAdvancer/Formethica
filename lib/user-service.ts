import { supabase } from './supabase'
import { generateUsername } from './user-utils'
import { Database } from './database.types'

type User = Database['public']['Tables']['users']['Row']
type UserInsert = Database['public']['Tables']['users']['Insert']
type UserUpdate = Database['public']['Tables']['users']['Update']

export interface UserProfile {
  id: string
  email: string
  username: string
  canChangeUsername: boolean
  usernameChangedAt: string | null
}

export class UserService {
  static async getOrCreateUser(email: string): Promise<UserProfile | null> {
    try {
      // First, try to get existing user
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (existingUser) {
        return {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
          canChangeUsername: !existingUser.username_changed_at,
          usernameChangedAt: existingUser.username_changed_at
        }
      }

      // If user doesn't exist, create one with a random username
      if (fetchError?.code === 'PGRST116') { // No rows returned
        const newUsername = generateUsername()

        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            email,
            username: newUsername
          })
          .select()
          .single()

        if (createError) {
          console.error('Error creating user:', createError)
          return null
        }

        return {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          canChangeUsername: true,
          usernameChangedAt: null
        }
      }

      console.error('Error fetching user:', fetchError)
      return null
    } catch (error) {
      console.error('Unexpected error in getOrCreateUser:', error)
      return null
    }
  }

  static async updateUsername(email: string, newUsername: string): Promise<{ success: boolean; error?: string }> {
    try {
      // First check if user can change username
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('username_changed_at')
        .eq('email', email)
        .single()

      if (fetchError) {
        return { success: false, error: 'User not found' }
      }

      if (user.username_changed_at) {
        return { success: false, error: 'Username can only be changed once' }
      }

      // Check if username is already taken
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('username', newUsername)
        .single()

      if (existingUser) {
        return { success: false, error: 'Username is already taken' }
      }

      // Update username and set username_changed_at
      const { error: updateError } = await supabase
        .from('users')
        .update({
          username: newUsername,
          username_changed_at: new Date().toISOString()
        })
        .eq('email', email)

      if (updateError) {
        return { success: false, error: 'Failed to update username' }
      }

      return { success: true }
    } catch (error) {
      console.error('Error updating username:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  static async getUserByEmail(email: string): Promise<UserProfile | null> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        canChangeUsername: !user.username_changed_at,
        usernameChangedAt: user.username_changed_at
      }
    } catch (error) {
      console.error('Error fetching user by email:', error)
      return null
    }
  }
}
