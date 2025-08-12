'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { Form } from '@/lib/types'
import { useAuth } from '@/lib/auth-context'

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

  // Ultra-fast fetch - just get forms, no submission counts
  const fetchForms = useCallback(async () => {
    if (!user?.id) {
      setForms([])
      setLoading(false)
      return
    }

    try {
      setError(null)
      setLoading(true)

      console.log('📊 Fetching forms for user:', user.id)

      // Simple, fast query for forms only
      const { data, error: fetchError } = await supabase
        .from('forms')
        .select('id, title, description, created_at, updated_at, user_id, short_url, is_active')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      console.log('📊 Forms query result:', { data: data?.length, error: fetchError })

      if (fetchError) {
        console.error('❌ Forms fetch error:', fetchError)
        throw fetchError
      }

      // Set forms with zero submission counts
      const formsWithCounts = (data || []).map(form => ({
        ...form,
        fields: [], // Empty fields for now
        submission_count: 0
      }))

      setForms(formsWithCounts)
      console.log('✅ Forms loaded successfully:', formsWithCounts.length)

    } catch (err) {
      console.error('💥 Error fetching forms:', err)
      setError(err instanceof Error ? err.message : 'Failed to load forms')
      setForms([])
    } finally {
      setLoading(false)
    }
  }, [user?.id])

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

  const refetch = useCallback(() => fetchForms(), [fetchForms])

  // Fast initial load
  useEffect(() => {
    if (user?.id) {
      fetchForms()
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
