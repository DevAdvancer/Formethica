'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { Form } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'
import { cacheManager } from '@/lib/cache-manager'

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
const CACHE_DURATION = 60000 // 1 minute for faster updates

export function useFormsOptimized(): UseFormsReturn {
  const { user } = useAuth()
  const [forms, setForms] = useState<FormWithSubmissions[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simplified and faster fetch function
  const fetchForms = useCallback(async (useCache = true) => {
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

      // Fast forms query without submission counts first
      const { data: formsData, error: formsError } = await supabase
        .from('forms')
        .select(`
          id,
          title,
          description,
          fields,
          created_at,
          updated_at,
          user_id,
          short_url,
          is_active
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (formsError) throw formsError

      // Set forms immediately with 0 counts for fast UI update
      const formsWithZeroCounts = (formsData || []).map(form => ({
        ...form,
        submission_count: 0
      }))

      setForms(formsWithZeroCounts)
      setLoading(false)

      // Cache the result immediately
      cacheManager.set(cacheKey, formsWithZeroCounts, CACHE_DURATION)

      // Then fetch submission counts in background (non-blocking)
      if (formsData && formsData.length > 0) {
        fetchSubmissionCounts(formsData, user.id, cacheKey)
      }

    } catch (err) {
      console.error('Error fetching forms:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch forms')
      setForms([])
      setLoading(false)
    }
  }, [user?.id])

  // Background submission count fetching
  const fetchSubmissionCounts = async (forms: any[], userId: string, cacheKey: string) => {
    try {
      const formIds = forms.map(form => form.id)

      // Get submission counts efficiently
      const { data: countsData, error: countsError } = await supabase
        .from('form_submissions')
        .select('form_id')
        .in('form_id', formIds)

      if (countsError) {
        console.warn('Failed to get submission counts:', countsError)
        return
      }

      // Count submissions per form
      const submissionCounts = countsData?.reduce((acc, submission) => {
        acc[submission.form_id] = (acc[submission.form_id] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {}

      // Update forms with actual counts
      const formsWithCounts = forms.map(form => ({
        ...form,
        submission_count: submissionCounts[form.id] || 0
      }))

      // Update state and cache
      setForms(formsWithCounts)
      cacheManager.set(cacheKey, formsWithCounts, CACHE_DURATION)

    } catch (err) {
      console.warn('Error fetching submission counts:', err)
      // Don't set error state for background fetch
    }
  }

  // Optimized delete form
  const deleteForm = useCallback(async (id: string): Promise<boolean> => {
    console.log('🗑️ Starting delete process for form:', id)

    try {
      setError(null)

      // Verify the form exists and belongs to the user
      const formToDelete = forms.find(f => f.id === id)
      if (!formToDelete || formToDelete.user_id !== user?.id) {
        throw new Error('Form not found or unauthorized')
      }

      // Optimistic update
      const originalForms = forms
      setForms(prev => prev.filter(form => form.id !== id))

      // Delete in parallel for better performance
      const [submissionsResult, shortUrlResult, formResult] = await Promise.allSettled([
        supabase.from('form_submissions').delete().eq('form_id', id),
        supabase.from('short_urls').delete().eq('form_id', id),
        supabase.from('forms').delete().eq('id', id).eq('user_id', user?.id || '').select()
      ])

      // Check if form deletion succeeded
      if (formResult.status === 'rejected' ||
          (formResult.status === 'fulfilled' && formResult.value.error)) {
        console.error('❌ Error deleting form:', formResult)
        setForms(originalForms)
        throw new Error('Failed to delete form')
      }

      // Update cache
      const cacheKey = `${CACHE_KEY}-${user?.id}`
      const cachedForms = cacheManager.get<FormWithSubmissions[]>(cacheKey)
      if (cachedForms) {
        cacheManager.set(cacheKey, cachedForms.filter(form => form.id !== id), CACHE_DURATION)
      }

      console.log('✅ Form deleted successfully')
      return true
    } catch (err) {
      console.error('💥 Error in delete process:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete form')
      return false
    }
  }, [forms, user?.id])

  // Optimized update form
  const updateForm = useCallback(async (id: string, updates: Partial<Form>): Promise<boolean> => {
    try {
      setError(null)

      if (!user?.id) {
        throw new Error('User not authenticated')
      }

      const { data, error } = await supabase
        .from('forms')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()

      if (error) throw error

      if (data && data.length > 0) {
        const updatedForm = data[0]
        setForms(prev => prev.map(form =>
          form.id === id ? { ...form, ...updatedForm } : form
        ))

        // Update cache
        const cacheKey = `${CACHE_KEY}-${user.id}`
        const cachedForms = cacheManager.get<FormWithSubmissions[]>(cacheKey)
        if (cachedForms) {
          cacheManager.set(
            cacheKey,
            cachedForms.map(form => form.id === id ? { ...form, ...updatedForm } : form),
            CACHE_DURATION
          )
        }
      }

      return true
    } catch (err) {
      console.error('Error updating form:', err)
      setError(err instanceof Error ? err.message : 'Failed to update form')
      return false
    }
  }, [forms, user?.id])

  // Refetch function that bypasses cache
  const refetch = useCallback(async () => {
    await fetchForms(false)
  }, [fetchForms])

  // Initial fetch with timeout protection
  useEffect(() => {
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout> | null = null

    const run = async () => {
      // Safety timeout to prevent infinite loading
      timeout = setTimeout(() => {
        if (!cancelled) {
          console.warn('Forms fetch timed out, stopping loading state')
          setLoading(false)
          setError('Loading timed out. Please refresh the page.')
        }
      }, 15000) // 15 seconds timeout

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
