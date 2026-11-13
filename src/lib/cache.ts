// ============================================================================
// STUDYPILOT AI — HIGH-PERFORMANCE IN-MEMORY LRU & TTL CACHE
// Eliminates duplicate AI queries and database lookups
// ============================================================================

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class SimpleLRUCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxItems: number;
  private defaultTTLMs: number;

  constructor(maxItems = 100, defaultTTLMs = 5 * 60 * 1000) {
    this.maxItems = maxItems;
    this.defaultTTLMs = defaultTTLMs;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // Refresh LRU order (delete and re-insert)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T, ttlMs = this.defaultTTLMs): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxItems) {
      // Evict oldest item
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }
}

// Global server-side caches
export const aiResponseCache = new SimpleLRUCache<string>(100, 10 * 60 * 1000); // 10 min TTL
export const documentChunkCache = new SimpleLRUCache<string>(50, 15 * 60 * 1000); // 15 min TTL
