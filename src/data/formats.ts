import type { ExhibitionFormat } from '@/types/domain'

/**
 * Exhibition formats describe the presentation itself: its branding, its
 * resolution and what a ticket costs. Aspect ratio is not listed here because it
 * depends on the title being screened, see `MoviePresentation` in `movies.ts`.
 */

export const DIGITAL_FORMAT: ExhibitionFormat = {
  id: 'digital',
  name: 'Digital',
  price: 14,
  resolution: 'Up to 4K',
  info: 'Standard digital theatrical presentation used by most multiplex auditoriums.'
}

export const IMAX_70MM_FORMAT: ExhibitionFormat = {
  id: 'imax-70mm',
  name: 'IMAX 70MM',
  price: 28,
  resolution: 'Up to 18K',
  info: "Photochemical 70mm film with 15 perforations per frame running horizontally through the projector. It is the behemoth, as Nolan intended, and only a few of the world's theaters can project it."
}

export const IMAX_FORMAT: ExhibitionFormat = {
  id: 'imax',
  name: 'IMAX',
  price: 23,
  resolution: 'Up to 4K',
  info: 'Digital IMAX presentation, usually framed at 1.90:1 for a taller image than standard auditoriums.'
}

export const FORMAT_70MM: ExhibitionFormat = {
  id: '70mm',
  name: '70MM',
  price: 25,
  resolution: 'Up to 8K',
  info: 'Large-format 70mm photochemical projection with exceptional analog detail.'
}

export const FORMAT_35MM: ExhibitionFormat = {
  id: '35mm',
  name: '35MM',
  price: 16,
  resolution: 'Up to 6K',
  features: ['Scope projection'],
  info: 'Traditional photochemical release format, usually a scope print.'
}

export const DOLBY_CINEMA_FORMAT: ExhibitionFormat = {
  id: 'dolby-cinema',
  name: 'Dolby Cinema',
  price: 21,
  resolution: '4K',
  features: ['Dolby Vision'],
  info: 'Premium 4K presentation with Dolby Vision HDR and immersive Dolby sound.'
}

export const PREMIUM_LARGE_FORMAT: ExhibitionFormat = {
  id: 'premium-large-format',
  name: 'Premium Large Format',
  price: 19,
  resolution: 'Up to 4K',
  features: ['4DX', 'Cinemark XD', 'RPX', 'MX4D', 'D-BOX'],
  info: 'Umbrella format for premium auditoriums beyond IMAX and Dolby, often combining larger screens with motion or enhanced projection systems.'
}
