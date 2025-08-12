'use client'

// Performance configuration for the entire application
export const PERFORMANCE_CONFIG = {
  // Cache durations
  CACHE: {
    USER_PROFILE: 300000, // 5 minutes
    FORMS_LIST: 120000, // 2 minutes
    FORM_DETAILS: 180000, // 3 minutes
    SUBMISSION_COUNTS: 60000, // 1 minute
    SESSION_CHECK: 600000, // 10 minutes
  },

  // API timeouts
  TIMEOUTS: {
    FORMS_FETCH: 15000, // 15 seconds
    USER_PROFILE: 10000, // 10 seconds
    SUBMISSION_COUNT: 8000, // 8 seconds
    FORM_SUBMIT: 30000, // 30 seconds
  },

  // Debounce settings
  DEBOUNCE: {
    AUTH_CHANGES: 100, // 100ms
    SEARCH: 300, // 300ms
    FORM_SAVE: 1000, // 1 second
  },

  // Batch settings
  BATCH: {
    MAX_FORMS_PER_QUERY: 50,
    MAX_SUBMISSIONS_PER_PAGE: 100,
  },

  // Background fetch delays
  BACKGROUND: {
    SUBMISSION_COUNTS_DELAY: 500, // 500ms after main query
    USER_PROFILE_REFRESH: 1000, // 1 second after auth change
  }
}

// Performance monitoring utilities
export class PerformanceOptimizer {
  private static metrics = new Map<string, number>()

  static startTimer(key: string): void {
    this.metrics.set(key, performance.now())
  }

  static endTimer(key: string): number {
    const start = this.metrics.get(key)
    if (!start) return 0

    const duration = performance.now() - start
    this.metrics.delete(key)

    if (duration > 1000) {
      console.warn(`⚠️ Slow operation detected: ${key} took ${Math.round(duration)}ms`)
    }

    return duration
  }

  static logQuery(operation: string, duration: number, recordCount?: number): void {
    const emoji = duration > 2000 ? '🐌' : duration > 1000 ? '⚡' : '🚀'
    const records = recordCount ? ` (${recordCount} records)` : ''
    console.log(`${emoji} ${operation}: ${Math.round(duration)}ms${records}`)
  }
}
