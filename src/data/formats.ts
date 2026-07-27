import type { ExhibitionFormat } from '../types/formats'

export const DIGITAL_FORMAT: ExhibitionFormat = {
  id: 'digital',
  name: 'Digital',
  aspectRatios: ['1.85:1', '2.39:1'],
  price: 14,
  resolution: 'Up to 4K',
  info: 'Standard digital theatrical presentation used by most multiplex auditoriums.'
}

export const IMAX_70MM_FORMAT: ExhibitionFormat = {
  id: 'imax-70mm',
  name: 'IMAX 70MM',
  aspectRatios: ['1.43:1'],
  price: 28,
  resolution: 'Up to 18K',
  info: "Photochemical 70mm film with 15 perforations per frame running horizontally through the projector. It is the behemoth, as Nolan intended, and only a few of the world's theaters can project it."
}

export const IMAX_FORMAT: ExhibitionFormat = {
  id: 'imax',
  name: 'IMAX',
  aspectRatios: ['1.90:1'],
  price: 23,
  resolution: 'Up to 4K',
  info: 'Digital IMAX presentation, usually framed at 1.90:1 for a taller image than standard auditoriums.'
}

export const FORMAT_70MM: ExhibitionFormat = {
  id: '70mm',
  name: '70MM',
  aspectRatios: ['2.20:1'],
  price: 25,
  resolution: 'Up to 8K',
  info: 'Large-format 70mm photochemical projection with exceptional analog detail and a wide 2.20:1 frame.'
}

export const FORMAT_35MM: ExhibitionFormat = {
  id: '35mm',
  name: '35MM',
  aspectRatios: ['2.39:1'],
  price: 16,
  resolution: 'Up to 6K',
  features: ['Scope projection'],
  info: 'Traditional photochemical release format. Scope engagements typically play in the classic 2.39:1 theatrical frame.'
}

export const DOLBY_CINEMA_FORMAT: ExhibitionFormat = {
  id: 'dolby-cinema',
  name: 'Dolby Cinema',
  aspectRatios: ['1.85:1', '2.39:1'],
  price: 21,
  resolution: '4K',
  features: ['Dolby Vision'],
  info: 'Premium 4K presentation with Dolby Vision HDR and immersive Dolby sound, commonly offered in either 1.85:1 or 2.39:1.'
}

export const PREMIUM_LARGE_FORMAT: ExhibitionFormat = {
  id: 'premium-large-format',
  name: 'Premium Large Format',
  aspectRatios: ['1.85:1', '2.39:1'],
  price: 19,
  resolution: 'Up to 4K',
  features: ['4DX', 'Cinemark XD', 'RPX', 'MX4D', 'D-BOX'],
  info: 'Umbrella format for premium auditoriums beyond IMAX and Dolby, often combining larger screens with motion or enhanced projection systems.'
}

export const DEFAULT_RELEASE_FORMATS: readonly ExhibitionFormat[] = [
  DIGITAL_FORMAT,
  PREMIUM_LARGE_FORMAT
]

/** Wide digital release: everything a modern multiplex can offer, no film prints. */
export const WIDE_DIGITAL_FORMATS: readonly ExhibitionFormat[] = [
  IMAX_FORMAT,
  DOLBY_CINEMA_FORMAT,
  PREMIUM_LARGE_FORMAT,
  DIGITAL_FORMAT
]

/** Premium digital release without an IMAX engagement. */
export const PREMIUM_DIGITAL_FORMATS: readonly ExhibitionFormat[] = [
  DOLBY_CINEMA_FORMAT,
  PREMIUM_LARGE_FORMAT,
  DIGITAL_FORMAT
]

/** Shot on film and released with photochemical prints alongside digital. */
export const FILM_ROADSHOW_FORMATS: readonly ExhibitionFormat[] = [
  IMAX_70MM_FORMAT,
  IMAX_FORMAT,
  FORMAT_70MM,
  FORMAT_35MM,
  DOLBY_CINEMA_FORMAT,
  PREMIUM_LARGE_FORMAT,
  DIGITAL_FORMAT
]
