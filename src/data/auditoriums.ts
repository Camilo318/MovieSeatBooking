import type { Auditorium } from '@/types/domain'

/** Physical room layout per exhibition format */
export const AUDITORIUMS_BY_FORMAT: Record<string, Auditorium> = {
  'imax-70mm': { rows: 12, seatsPerRow: 18, aisleAfter: [3, 15] },
  imax: { rows: 11, seatsPerRow: 16, aisleAfter: [3, 13] },
  '70mm': { rows: 10, seatsPerRow: 16, aisleAfter: [3, 13] },
  'premium-large-format': { rows: 9, seatsPerRow: 16, aisleAfter: [3, 13] },
  'dolby-cinema': { rows: 9, seatsPerRow: 14, aisleAfter: [3, 11] },
  digital: { rows: 9, seatsPerRow: 14, aisleAfter: [3, 11] },
  '35mm': { rows: 8, seatsPerRow: 12, aisleAfter: [3, 9] }
}

export function getAuditoriumForFormat(formatId: string): Auditorium {
  return AUDITORIUMS_BY_FORMAT[formatId] ?? AUDITORIUMS_BY_FORMAT.digital
}
