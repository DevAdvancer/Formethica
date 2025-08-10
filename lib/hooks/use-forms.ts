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

  // Optimized fetch function with caching
  const fetchForms = useCallback(async (useCache = true) => {
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

      // Use optimized query
      const formsWithCounts = await queryOptimizer.getFormsWithSubmissionCounts(user.id)

      // Update cache
      cacheManager.set(cacheKey, formsWithCounts, CACHE_DURATION)

      setForms(formsWithCounts)
    } catch (err) {
      console.error('Error fetching forms:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch forms')
      setForms([])
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  // Delete form with optimistic updates
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
        .eq('user_id', user?.id || '') // Security check

      if (deleteError) {
        // Revert optimistic update on error
        setForms(originalForms)
        throw deleteError
      }

      // Update cache
      const cacheKey = `${CACHE_KEY}-${user?.id}`
      const cachedForms = cacheManager.get<FormWithSubmissions[]>(cacheKey)
      if (cachedForms) {
        cacheManager.set(cacheKey, cachedForms.filter(form => form.id !== id), CACHE_DURATION)
      }

      return true
    } catch (err) {
      console.error('Error deleting form:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete form')
      return false
    }
  }, [forms, user?.id])

  // Update form with optimistic updates
  const updateForm = useCallback(async (id: string, updates: Partial<Form>): Promise<boolean> => {
    try {
      setError(null)

      // Optimistic update
      const originalForms = forms
      setForms(prev => prev.map(form =>
        form.id === id ? { ...form, ...updates } : form
      ))

      const { error: updateError } = await supabase
        .from('forms')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id || '') // Security check

      if (updateError) {
        // Revert optimistic update on error
        setForms(originalForms)
        throw updateError
      }

      // Update cache
      const cacheKey = `${CACHE_KEY}-${user?.id}`
      const cachedForms = cacheManager.get<FormWithSubmissions[]>(cacheKey)
      if (cachedForms) {
        cacheManager.set(
          cacheKey,
          cachedForms.map(form => form.id === id ? { ...form, ...updates } : form),
          CACHE_DURATION
        )
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

  // Initial fetch
  useEffect(() => {
    fetchForms()
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
