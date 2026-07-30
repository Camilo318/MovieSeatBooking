export const ASPECT_RATIOS = {
  '1.43:1': { venues: 'IMAX 70mm & Dual Laser (IMAX GT)' },
  '1.85:1': { venues: 'Constant height venues (Flat)' },
  '1.90:1': { venues: 'IMAX Xenon & Single Laser' },
  '2.20:1': { venues: '70mm' },
  '2.39:1': {
    venues: '35mm & constant width venues (Scope)'
  },
  '2.76:1': { venues: 'Ultra Panavision 70' }
} as const

export type AspectRatioId = keyof typeof ASPECT_RATIOS

/** CSS aspect-ratio value for a given ratio id */
export const ASPECT_RATIO_VALUES: Record<AspectRatioId, string> = {
  '1.43:1': '1.43 / 1',
  '1.85:1': '1.85 / 1',
  '1.90:1': '1.9 / 1',
  '2.20:1': '2.2 / 1',
  '2.39:1': '2.39 / 1',
  '2.76:1': '2.76 / 1'
}

export interface ExhibitionFormat {
  id: string
  name: string
  /** Ticket price in USD. Every title costs the same, only the format changes it. */
  price: number
  resolution?: string
  features?: readonly string[]
  info?: string
}

/**
 * One way a title is offered, as authored in the catalog: the format plus the
 * ratios it was framed at. Aspect ratio belongs to this pairing rather than to
 * the format, because the combination is per movie. Resolved into a `Showing`.
 */
export interface FormatOption {
  format: ExhibitionFormat
  aspectRatios: readonly AspectRatioId[]
}

export interface Auditorium {
  rows: number
  seatsPerRow: number
  /** Seat numbers after which an aisle gap is rendered */
  aisleAfter: readonly number[]
}

export type SeatStatus = 'available' | 'selected' | 'occupied'

export interface Seat {
  id: string
  row: string
  number: number
}

export interface Movie {
  id: string
  title: string
  formatOptions: readonly FormatOption[]
  /** Cloudinary delivery URLs for auditorium stills, in gallery order. */
  stills?: readonly string[]
}

/**
 * The bookable unit: one movie in one format, in its own auditorium, with its
 * own seat inventory. Id is `${movieId}:${formatId}`.
 */
export interface Showing {
  id: string
  movieId: string
  movieTitle: string
  format: ExhibitionFormat
  aspectRatios: readonly AspectRatioId[]
  auditorium: Auditorium
  stills: readonly string[]
}
