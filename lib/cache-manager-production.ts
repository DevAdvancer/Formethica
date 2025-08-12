'use client'

interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
  version: string // Add versioning for cache invalidation
}

class ProductionCacheManager {
  private cache = new Map<string, CacheItem<any>>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes
  private readonly VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    // Prefix key with version for cache busting on deployments
    const versionedKey = `${this.VERSION}-${key}`

    this.cache.set(versionedKey, {
      data,
      timestamp: Date.now(),
      ttl,
      version: this.VERSION
    })

    // Clean up old versions
    this.cleanupOldVersions(key)
  }

  get<T>(key: string): T | null {
    const versionedKey = `${this.VERSION}-${key}`
    const item = this.cache.get(versionedKey)

    if (!item) {
      return null
    }

    const now = Date.now()
    if (now - item.timestamp > item.ttl || item.version !== this.VERSION) {
      this.cache.delete(versionedKey)
      return null
    }

    return item.data as T
  }

  has(key: string): boolean {
    const versionedKey = `${this.VERSION}-${key}`
    const item = this.cache.get(versionedKey)

    if (!item) {
      return false
    }

    const now = Date.now()
    if (now - item.timestamp > item.ttl || item.version !== this.VERSION) {
      this.cache.delete(versionedKey)
      return false
    }

    return true
  }

  delete(key: string): boolean {
    const versionedKey = `${this.VERSION}-${key}`
    return this.cache.delete(versionedKey)
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean up cache entries from old versions
  private cleanupOldVersions(baseKey: string): void {
    for (const [key, item] of this.cache.entries()) {
      if (key.endsWith(`-${baseKey}`) && item.version !== this.VERSION) {
        this.cache.delete(key)
      }
    }
  }

  // Periodic cleanup of expired and old version items
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl || item.version !== this.VERSION) {
        this.cache.delete(key)
      }
    }
  }

  // Get cache stats for monitoring
  getStats(): {
    size: number
    keys: string[]
    version: string
    oldVersionEntries: number
  } {
    const keys = Array.from(this.cache.keys())
    const oldVersionEntries = keys.filter(key => {
      const item = this.cache.get(key)
      return item && item.version !== this.VERSION
    }).length

    return {
      size: this.cache.size,
      keys,
      version: this.VERSION,
      oldVersionEntries
    }
  }

  // Preload critical data
  async preloadCriticalData(userId: string): Promise<void> {
    // This will be called on app startup to preload essential data
    console.log('🚀 Preloading critical data for user:', userId)
  }
}

// Global cache instance with production optimizations
export const productionCacheManager = new ProductionCacheManager()

// Auto cleanup every 5 minutes in production
if (typeof window !== 'undefined') {
  setInterval(() => {
    productionCacheManager.cleanup()
  }, 5 * 60 * 1000)

  // Log cache stats in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(() => {
      const stats = productionCacheManager.getStats()
      if (stats.size > 0) {
        console.log('📊 Cache stats:', stats)
      }
    }, 30 * 1000) // Every 30 seconds
  }
}
