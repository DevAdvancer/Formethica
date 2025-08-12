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

  // Single-query forms + submission counts using PostgREST relationship aggregation
  // Requires a foreign key forms.id -> form_submissions.form_id (present in schema)
  // Returns each form with form_submissions: [{ count: number }]
  // We will map that to submission_count for the UI
  async getFormsWithCounts(userId: string, options: QueryOptions = {}) {
    const {
      orderBy = { column: 'created_at', ascending: false },
      limit,
      offset
    } = options

    return performanceMonitor.measureAsync('forms-with-embedded-counts', async () => {
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
          is_active,
          form_submissions(count)
        `)
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

  // Batch query for forms with submission counts (single round-trip)
  async getFormsWithSubmissionCounts(userId: string, options: QueryOptions = {}) {
    return performanceMonitor.measureAsync('forms-with-counts-batch', async () => {
      try {
        // Try the optimized embedded count query first
        const { data, error } = await this.getFormsWithCounts(userId, options)

        if (error) {
          console.warn('Embedded count query failed, falling back to separate queries:', error)
          throw error
        }

        if (!data || data.length === 0) return []

        // Map embedded counts
        // data[i].form_submissions is an array like [{ count: number }]
        return data.map((form: any) => ({
          ...form,
          submission_count: Array.isArray(form.form_submissions) && form.form_submissions[0]?.count
            ? form.form_submissions[0].count
            : 0
        }))
      } catch (embeddedError) {
        console.warn('Embedded count query failed, using fallback approach:', embeddedError)

        // Fallback: Get forms first, then get counts separately
        const { data: formsData, error: formsError } = await this.getForms(userId, options)

        if (formsError) throw formsError
        if (!formsData || formsData.length === 0) return []

        // Get submission counts for all forms in a single query
        const formIds = formsData.map(form => form.id)
        const { data: countsData, error: countsError } = await supabase
          .from('form_submissions')
          .select('form_id')
          .in('form_id', formIds)

        if (countsError) {
          console.warn('Failed to get submission counts, defaulting to 0:', countsError)
          // Return forms with 0 counts if count query fails
          return formsData.map(form => ({
            ...form,
            submission_count: 0
          }))
        }

        // Count submissions per form
        const submissionCounts = countsData?.reduce((acc, submission) => {
          acc[submission.form_id] = (acc[submission.form_id] || 0) + 1
          return acc
        }, {} as Record<string, number>) || {}

        // Combine forms with their counts
        return formsData.map(form => ({
          ...form,
          submission_count: submissionCounts[form.id] || 0
        }))
      }
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
