'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { Form } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'
import { PERFORMANCE_CONFIG, PerformanceOptimizer } from '@/lib/performance-config'
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

export function useFormsFast(): UseFormsReturn {
  const { user } = useAuth()
  const [forms, setForms] = useState<FormWithSubmissions[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Ultra-fast fetch with caching and performance monitoring
  const fetchForms = useCallback(async (useCache = true) => {
    if (!user?.id) {
      setForms([])
      setLoading(false)
      return
    }

    try {
      setError(null)

      // Check cache first
      const cacheKey = `forms-fast-${user.id}`
      if (useCache && cacheManager.has(cacheKey)) {
        const cachedForms = cacheManager.get<FormWithSubmissions[]>(cacheKey)
        if (cachedForms) {
          setForms(cachedForms)
          setLoading(false)
          console.log('🚀 Forms loaded from cache:', cachedForms.length)
          return
        }
      }

      setLoading(true)
      PerformanceOptimizer.startTimer('forms-fetch')

      console.log('📊 Fetching forms for user:', user.id)

      // Get complete form data including fields
      const { data, error: fetchError } = await supabase
        .from('forms')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(PERFORMANCE_CONFIG.BATCH.MAX_FORMS_PER_QUERY)

      const fetchDuration = PerformanceOptimizer.endTimer('forms-fetch')
      PerformanceOptimizer.logQuery('Forms fetch', fetchDuration, data?.length)

      if (fetchError) {
        console.error('❌ Forms fetch error:', fetchError)
        throw fetchError
      }

      // Set forms with zero submission counts initially for fast UI
      const formsWithCounts = (data || []).map(form => ({
        ...form,
        submission_count: 0
      }))

      setForms(formsWithCounts)

      // Cache the results
      cacheManager.set(cacheKey, formsWithCounts, PERFORMANCE_CONFIG.CACHE.FORMS_LIST)

      console.log('✅ Forms loaded successfully:', formsWithCounts.length)

      // Fetch submission counts in background if we have forms
      if (data && data.length > 0) {
        setTimeout(() => {
          fetchSubmissionCountsBackground(data, user.id, cacheKey)
        }, PERFORMANCE_CONFIG.BACKGROUND.SUBMISSION_COUNTS_DELAY)
      }

    } catch (err) {
      console.error('💥 Error fetching forms:', err)
      setError(err instanceof Error ? err.message : 'Failed to load forms')
      setForms([])
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  // Background submission count fetching with performance tracking
  const fetchSubmissionCountsBackground = async (forms: any[], userId: string, cacheKey: string) => {
    try {
      PerformanceOptimizer.startTimer('submission-counts')

      const formIds = forms.map(form => form.id)

      // Get submission counts efficiently
      const { data: countsData, error: countsError } = await supabase
        .from('form_submissions')
        .select('form_id')
        .in('form_id', formIds)

      const countsDuration = PerformanceOptimizer.endTimer('submission-counts')
      PerformanceOptimizer.logQuery('Submission counts', countsDuration, countsData?.length)

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
      const updatedForms = forms.map(form => ({
        ...form,
        submission_count: submissionCounts[form.id] || 0
      }))

      setForms(updatedForms)

      // Update cache with submission counts
      cacheManager.set(cacheKey, updatedForms, PERFORMANCE_CONFIG.CACHE.FORMS_LIST)

      console.log('✅ Submission counts updated in background')

    } catch (err) {
      console.warn('Error fetching submission counts:', err)
      // Don't set error state for background fetch
    }
  }

  // Simple delete
  const deleteForm = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null)

      // Optimistic update
      const originalForms = forms
      setForms(prev => prev.filter(form => form.id !== id))

      const { error: deleteError } = await supabase
        .from('forms')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id || '')

      if (deleteError) {
        setForms(originalForms)
        throw deleteError
      }

      return true
    } catch (err) {
      console.error('Error deleting form:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete form')
      return false
    }
  }, [forms, user?.id])

  // Simple update
  const updateForm = useCallback(async (id: string, updates: Partial<Form>): Promise<boolean> => {
    try {
      setError(null)

      const { data, error: updateError } = await supabase
        .from('forms')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id || '')
        .select()

      if (updateError) throw updateError

      if (data && data.length > 0) {
        setForms(prev => prev.map(form =>
          form.id === id ? { ...form, ...data[0] } : form
        ))
      }

      return true
    } catch (err) {
      console.error('Error updating form:', err)
      setError(err instanceof Error ? err.message : 'Failed to update form')
      return false
    }
  }, [user?.id])

  const refetch = useCallback(() => fetchForms(false), [fetchForms])

  // Fast initial load with timeout protection
  useEffect(() => {
    if (!user?.id) return

    let timeoutId: NodeJS.Timeout

    const loadWithTimeout = async () => {
      // Set timeout to prevent infinite loading
      timeoutId = setTimeout(() => {
        setLoading(false)
        setError('Loading timed out. Please refresh the page.')
        console.warn('⏰ Forms fetch timed out')
      }, PERFORMANCE_CONFIG.TIMEOUTS.FORMS_FETCH)

      try {
        await fetchForms()
      } finally {
        clearTimeout(timeoutId)
      }
    }

    loadWithTimeout()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [user?.id, fetchForms])

  return useMemo(() => ({
    forms,
    loading,
    error,
    refetch,
    deleteForm,
    updateForm
  }), [forms, loading, error, refetch, deleteForm, updateForm])
}
