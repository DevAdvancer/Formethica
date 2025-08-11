'use client'

interface PerformanceMetric {
  name: string
  startTime: number
  endTime?: number
  duration?: number
}

class PerformanceMonitor {
  private metrics = new Map<string, PerformanceMetric>()
  private enabled = process.env.NODE_ENV === 'development'

  start(name: string): void {
    if (!this.enabled) return

    this.metrics.set(name, {
      name,
      startTime: performance.now()
    })
  }

  end(name: string): number | null {
    if (!this.enabled) return null

    const metric = this.metrics.get(name)
    if (!metric) {
      console.warn(`Performance metric "${name}" not found`)
      return null
    }

    const endTime = performance.now()
    const duration = endTime - metric.startTime

    metric.endTime = endTime
    metric.duration = duration

    console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`)

    return duration
  }

  measure<T>(name: string, fn: () => T): T {
    if (!this.enabled) return fn()

    this.start(name)
    const result = fn()
    this.end(name)

    return result
  }

  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    if (!this.enabled) return fn()

    this.start(name)
    const result = await fn()
    this.end(name)

    return result
  }

  getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values()).filter(m => m.duration !== undefined)
  }

  clear(): void {
    this.metrics.clear()
  }

  // Log slow operations
  logSlowOperations(threshold = 1000): void {
    const slowOps = this.getMetrics().filter(m => (m.duration || 0) > threshold)

    if (slowOps.length > 0) {
      console.warn('🐌 Slow operations detected:', slowOps)
    }
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Auto-log slow operations every 30 seconds in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  setInterval(() => {
    performanceMonitor.logSlowOperations()
  }, 30000)
}
