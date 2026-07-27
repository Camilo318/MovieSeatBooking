import {
  DIGITAL_FORMAT,
  DOLBY_CINEMA_FORMAT,
  FILM_ROADSHOW_FORMATS,
  FORMAT_35MM,
  FORMAT_70MM,
  IMAX_70MM_FORMAT,
  IMAX_FORMAT,
  PREMIUM_DIGITAL_FORMATS,
  PREMIUM_LARGE_FORMAT,
  WIDE_DIGITAL_FORMATS
} from './formats'
import {
  SPIDER_MAN_BRAND_NEW_DAY_GALLERY,
  THE_ODYSSEY_GALLERY
} from './galleries'
import type { ExhibitionFormat } from '../types/formats'

export interface MovieDefinition {
  name: string
  formats: readonly ExhibitionFormat[]
  /** Stills shown on the auditorium screen, see `galleries.ts` */
  media?: readonly string[]
}

export const MOVIE_CATALOG: readonly MovieDefinition[] = [
  {
    name: 'The Odyssey',
    formats: [
      IMAX_70MM_FORMAT,
      IMAX_FORMAT,
      FORMAT_70MM,
      FORMAT_35MM,
      DOLBY_CINEMA_FORMAT,
      PREMIUM_LARGE_FORMAT
    ],
    media: THE_ODYSSEY_GALLERY
  },
  {
    name: 'Oppenheimer',
    formats: FILM_ROADSHOW_FORMATS
  },
  {
    name: 'Interstellar',
    formats: [
      IMAX_70MM_FORMAT,
      IMAX_FORMAT,
      FORMAT_70MM,
      FORMAT_35MM,
      DIGITAL_FORMAT
    ]
  },
  {
    name: 'Dunkirk',
    formats: [
      IMAX_70MM_FORMAT,
      IMAX_FORMAT,
      FORMAT_70MM,
      FORMAT_35MM,
      DIGITAL_FORMAT
    ]
  },
  {
    name: 'Sinners',
    formats: FILM_ROADSHOW_FORMATS
  },
  {
    name: 'The Dark Knight',
    formats: [
      IMAX_70MM_FORMAT,
      IMAX_FORMAT,
      FORMAT_35MM,
      DIGITAL_FORMAT
    ]
  },
  {
    name: 'Spider-Man: Brand New Day',
    formats: PREMIUM_DIGITAL_FORMATS,
    media: SPIDER_MAN_BRAND_NEW_DAY_GALLERY
  },
  {
    name: 'Avengers: End Game',
    formats: WIDE_DIGITAL_FORMATS
  },
  {
    name: 'Toy Story 5',
    formats: PREMIUM_DIGITAL_FORMATS
  }
] as const
