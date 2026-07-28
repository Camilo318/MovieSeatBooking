import type { Auditorium } from '@/types/domain'
import { buildSeatGrid } from './seats'

const occupancyCache = new Map<string, readonly string[]>()

/** Simple string hash for seeding */
function hashString(str: string): number {
  let hash = 2166136261
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Mulberry32 PRNG */
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Deterministic baseline house occupancy for a showing.
 * Roughly 20–30% of seats are pre-occupied, stable across reloads.
 */
export function getBaselineOccupancy(
  showingId: string,
  auditorium: Auditorium
): readonly string[] {
  const cached = occupancyCache.get(showingId)
  if (cached) return cached

  const allSeats = buildSeatGrid(auditorium)
  const rng = mulberry32(hashString(showingId))
  const targetRate = 0.2 + rng() * 0.1
  const targetCount = Math.floor(allSeats.length * targetRate)

  const shuffled = [...allSeats]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  const occupied = shuffled.slice(0, targetCount).map(s => s.id)
  occupancyCache.set(showingId, occupied)
  return occupied
}
