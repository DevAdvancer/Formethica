'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { Form } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'
import { cacheManager } from '@/lib/cache-manager'
import { performanceMonitor } from '@/lib/performance-monitor'
import { queryOptimizer } from '@/lib/query-optimizer'

interface FormWithSubmissions extends Form {
  submission_count: number
}

interface UseFormsReturn {
  forms: FormWithSubmissions[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  deleteForm: (id: string) => Promise<boolean>
  updateForm: (id: string, updates: Partial<Form>) => Promise<boolean>
}

const CACHE_KEY = 'user-forms'
const CACHE_DURATION = 30000 // 30 seconds

export function useForms(): UseFormsReturn {
  const { user } = useAuth()
  const [forms, setForms] = useState<FormWithSubmissions[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Optimized fetch function with caching and retry logic
  const fetchForms = useCallback(async (useCache = true, retryCount = 0) => {
    // Wait for auth to resolve
    if (!user?.id) {
      setForms([])
      setLoading(false)
      return
    }

    try {
      setError(null)

      // Check cache first
      const cacheKey = `${CACHE_KEY}-${user.id}`
      if (useCache && cacheManager.has(cacheKey)) {
        const cachedForms = cacheManager.get<FormWithSubmissions[]>(cacheKey)
        if (cachedForms) {
          setForms(cachedForms)
          setLoading(false)
          return
        }
      }

      setLoading(true)

      // Use optimized single round-trip query with fallback
      const formsWithCounts = await queryOptimizer.getFormsWithSubmissionCounts(user.id)

      // Validate the data structure
      const validatedForms = formsWithCounts.map(form => ({
        ...form,
        submission_count: typeof form.submission_count === 'number' ? form.submission_count : 0
      }))

      // Update cache
      cacheManager.set(cacheKey, validatedForms, CACHE_DURATION)

      setForms(validatedForms)
    } catch (err) {
      console.error('Error fetching forms (attempt', retryCount + 1, '):', err)

      // Retry once on failure
      if (retryCount === 0) {
        console.log('Retrying forms fetch...')
        setTimeout(() => fetchForms(false, 1), 1000)
        return
      }

      // If retry also fails, try a basic query without counts
      try {
        console.log('Attempting basic forms query without counts...')
        const { data: basicForms, error: basicError } = await supabase
          .from('forms')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (basicError) throw basicError

        const formsWithZeroCounts = (basicForms || []).map(form => ({
          ...form,
          submission_count: 0
        }))

        setForms(formsWithZeroCounts)
        setError('Some features may be limited due to a temporary issue')
      } catch (basicErr) {
        console.error('Basic forms query also failed:', basicErr)
        setError(err instanceof Error ? err.message : 'Failed to fetch forms')
        setForms([])
      }
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  // Delete form with optimistic updates and cascade delete
  const deleteForm = useCallback(async (id: string): Promise<boolean> => {
    console.log('🗑️ Starting delete process for form:', id)
    console.log('👤 Current user:', user?.id)
    console.log('📋 Current forms count:', forms.length)

    try {
      setError(null)

      // Verify the form exists and belongs to the user
      const formToDelete = forms.find(f => f.id === id)
      if (!formToDelete) {
        console.error('❌ Form not found in current forms list')
        throw new Error('Form not found')
      }

      if (formToDelete.user_id !== user?.id) {
        console.error('❌ Form does not belong to current user')
        throw new Error('Unauthorized to delete this form')
      }

      console.log('✅ Form validation passed, proceeding with deletion')

      // Optimistic update
      const originalForms = forms
      setForms(prev => prev.filter(form => form.id !== id))
      console.log('🔄 Applied optimistic update')

      // First delete all form submissions
      console.log('🗑️ Deleting form submissions...')
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('form_submissions')
        .delete()
        .eq('form_id', id)
        .select()

      if (submissionsError) {
        console.warn('⚠️ Error deleting form submissions:', submissionsError)
      } else {
        console.log('✅ Deleted submissions:', submissionsData?.length || 0)
      }

      // Delete short URLs associated with the form
      console.log('🗑️ Deleting short URLs...')
      const { data: shortUrlData, error: shortUrlError } = await supabase
        .from('short_urls')
        .delete()
        .eq('form_id', id)
        .select()

      if (shortUrlError) {
        console.warn('⚠️ Error deleting short URLs:', shortUrlError)
      } else {
        console.log('✅ Deleted short URLs:', shortUrlData?.length || 0)
      }

      // Finally delete the form itself
      console.log('🗑️ Deleting form...')
      const { data: formData, error: deleteError } = await supabase
        .from('forms')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id || '')
        .select()

      if (deleteError) {
        console.error('❌ Error deleting form:', deleteError)
        // Revert optimistic update on error
        setForms(originalForms)
        throw deleteError
      }

      if (!formData || formData.length === 0) {
        console.error('❌ No form was deleted - possibly due to RLS or permissions')
        setForms(originalForms)
        throw new Error('Form could not be deleted - check permissions')
      }

      console.log('✅ Form deleted successfully:', formData)

      // Update cache
      const cacheKey = `${CACHE_KEY}-${user?.id}`
      const cachedForms = cacheManager.get<FormWithSubmissions[]>(cacheKey)
      if (cachedForms) {
        cacheManager.set(cacheKey, cachedForms.filter(form => form.id !== id), CACHE_DURATION)
        console.log('🔄 Updated cache')
      }

      console.log('🎉 Delete process completed successfully')
      return true
    } catch (err) {
      console.error('💥 Error in delete process:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete form')
      // Revert optimistic update on error
      setForms(originalForms)
      return false
    }
  }, [forms, user?.id])

  // Update form with optimistic updates
  const updateForm = useCallback(async (id: string, updates: Partial<Form>): Promise<boolean> => {
    try {
      setError(null)

      // Ensure user is authenticated
      if (!user?.id) {
        throw new Error('User not authenticated')
      }

      console.log('🔄 Updating form:', id, 'with:', updates)

      const { data: updateData, error: updateError } = await supabase
        .from('forms')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()

      if (updateError) {
        console.error('❌ Update failed:', updateError)
        console.error('Error details:', {
          code: updateError.code,
          message: updateError.message,
          details: updateError.details,
          hint: updateError.hint
        })
        throw updateError
      }

      console.log('✅ Form updated successfully:', updateData?.length ? updateData[0] : 'No data returned')

      // Update local state with the returned data from database
      if (updateData && updateData.length > 0) {
        const updatedForm = updateData[0]
        setForms(prev => prev.map(form =>
          form.id === id ? { ...form, ...updatedForm } : form
        ))

        // Update cache with actual database data
        const cacheKey = `${CACHE_KEY}-${user.id}`
        const cachedForms = cacheManager.get<FormWithSubmissions[]>(cacheKey)
        if (cachedForms) {
          cacheManager.set(
            cacheKey,
            cachedForms.map(form => form.id === id ? { ...form, ...updatedForm } : form),
            CACHE_DURATION
          )
        }
      } else {
        // If no data returned, force a refetch to ensure UI is in sync
        console.log('⚠️ No data returned from update, forcing refetch')
        await fetchForms(false) // Force bypass cache
      }

      return true
    } catch (err) {
      console.error('Error updating form:', err)
      setError(err instanceof Error ? err.message : 'Failed to update form')
      return false
    }
  }, [forms, user?.id, fetchForms])

  // Refetch function that bypasses cache
  const refetch = useCallback(async () => {
    await fetchForms(false, 0)
  }, [fetchForms])

  // Initial fetch with safe guard and timeout to avoid indefinite loading
  useEffect(() => {
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout> | null = null

    const run = async () => {
      // Safety timeout: if fetch hangs, stop loading and show empty state
      timeout = setTimeout(() => {
        if (!cancelled) {
          console.warn('Forms fetch timed out, stopping loading state')
          setLoading(false)
        }
      }, 10000)

      await fetchForms()

      if (timeout) clearTimeout(timeout)
    }

    run()

    return () => {
      cancelled = true
      if (timeout) clearTimeout(timeout)
    }
  }, [fetchForms])

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => ({
    forms,
    loading,
    error,
    refetch,
    deleteForm,
    updateForm
  }), [forms, loading, error, refetch, deleteForm, updateForm])
}
