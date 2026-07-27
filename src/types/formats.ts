export const ASPECT_RATIOS = {
  '1.43:1': { venues: 'IMAX 70mm & Dual Laser (IMAX GT)' },
  '1.85:1': { venues: 'Constant height venues (Flat)' },
  '1.90:1': { venues: 'IMAX Xenon & Single Laser' },
  '2.20:1': { venues: '70mm' },
  '2.39:1': {
    venues: '35mm & constant width venues (Scope)'
  }
} as const

export type AspectRatioId = keyof typeof ASPECT_RATIOS

/** CSS class applied to the screen for a given aspect ratio, e.g. `1.43:1` → `ratio-1-43` */
export function aspectRatioClassName(ratio: AspectRatioId): string {
  return `ratio-${ratio.split(':')[0].replace('.', '-')}`
}

export interface ExhibitionFormat {
  id: string
  name: string
  aspectRatios: readonly AspectRatioId[]
  /** Ticket price in USD. Every title costs the same, only the format changes it. */
  price: number
  resolution?: string
  features?: readonly string[]
  info?: string
}
