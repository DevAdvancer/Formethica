'use client'

import { supabase } from './supabase'
import { performanceMonitor } from './performance-monitor'

interface QueryOptions {
  select?: string
  filters?: Record<string, any>
  orderBy?: { column: string; ascending?: boolean }
  limit?: number
  offset?: number
}

class QueryOptimizer {
  // Optimized form queries with proper indexing hints
  async getForms(userId: string, options: QueryOptions = {}) {
    const {
      select = `
        id,
        title,
        description,
        fields,
        created_at,
        updated_at,
        user_id,
        short_url,
        is_active
      `,
      orderBy = { column: 'created_at', ascending: false },
      limit,
      offset
    } = options

    return performanceMonitor.measureAsync('optimized-forms-query', async () => {
      let query = supabase
        .from('forms')
        .select(select)
        .eq('user_id', userId)

      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false })
      }

      if (limit) {
        query = query.limit(limit)
      }

      if (offset) {
        query = query.range(offset, offset + (limit || 10) - 1)
      }

      return query
    })
  }

  // Optimized submission count query
  async getFormSubmissionCounts(formIds: string[]) {
    if (formIds.length === 0) return []

    return performanceMonitor.measureAsync('submission-counts-query', async () => {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('form_id')
        .in('form_id', formIds)

      if (error) throw error

      // Count submissions per form
      const counts = formIds.map(formId => ({
        form_id: formId,
        count: data?.filter(sub => sub.form_id === formId).length || 0
      }))

      return counts
    })
  }

  // Batch query for forms with submission counts
  async getFormsWithSubmissionCounts(userId: string, options: QueryOptions = {}) {
    return performanceMonitor.measureAsync('forms-with-counts-batch', async () => {
      // First get forms
      const { data: forms, error: formsError } = await this.getForms(userId, options)

      if (formsError) throw formsError
      if (!forms || forms.length === 0) return []

      // Then get submission counts in batch
      const formIds = forms.map(form => form.id)
      const submissionCounts = await this.getFormSubmissionCounts(formIds)

      // Merge the data
      return forms.map(form => ({
        ...form,
        submission_count: submissionCounts.find(sc => sc.form_id === form.id)?.count || 0
      }))
    })
  }

  // Optimized single form query
  async getForm(formId: string, userId?: string) {
    return performanceMonitor.measureAsync('single-form-query', async () => {
      let query = supabase
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
        .eq('id', formId)

      if (userId) {
        query = query.eq('user_id', userId)
      }

      return query.single()
    })
  }

  // Optimized submissions query with pagination
  async getFormSubmissions(formId: string, options: { limit?: number; offset?: number } = {}) {
    const { limit = 50, offset = 0 } = options

    return performanceMonitor.measureAsync('form-submissions-query', async () => {
      return supabase
        .from('form_submissions')
        .select(`
          id,
          data,
          submitted_at,
          ip_address
        `)
        .eq('form_id', formId)
        .order('submitted_at', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }

  // Bulk operations
  async bulkDeleteForms(formIds: string[], userId: string) {
    return performanceMonitor.measureAsync('bulk-delete-forms', async () => {
      return supabase
        .from('forms')
        .delete()
        .in('id', formIds)
        .eq('user_id', userId)
    })
  }

  async bulkUpdateForms(updates: Array<{ id: string; data: any }>, userId: string) {
    return performanceMonitor.measureAsync('bulk-update-forms', async () => {
      // Use upsert for bulk updates
      const formattedUpdates = updates.map(update => ({
        id: update.id,
        user_id: userId,
        ...update.data
      }))

      return supabase
        .from('forms')
        .upsert(formattedUpdates, { onConflict: 'id' })
        .eq('user_id', userId)
    })
  }
}

export const queryOptimizer = new QueryOptimizer()
