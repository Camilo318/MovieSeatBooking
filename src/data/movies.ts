import {
  DIGITAL_FORMAT,
  DOLBY_CINEMA_FORMAT,
  FORMAT_35MM,
  FORMAT_70MM,
  IMAX_70MM_FORMAT,
  IMAX_FORMAT,
  PREMIUM_LARGE_FORMAT
} from './formats'
import {
  SPIDER_MAN_BRAND_NEW_DAY_GALLERY,
  THE_ODYSSEY_GALLERY
} from './galleries'
import type { MoviePresentation } from '../types/formats'

export interface MovieDefinition {
  name: string
  /** Formats this title played in, each with the ratios it was framed at */
  presentations: readonly MoviePresentation[]
  /** Stills shown on the auditorium screen, see `galleries.ts` */
  media?: readonly string[]
}

/**
 * Shot on film and released on prints, where every gauge carries its own native
 * ratio and the digital release plays scope.
 */
const FILM_PRINT_RELEASE: readonly MoviePresentation[] = [
  { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
  { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
  { format: FORMAT_70MM, aspectRatios: ['2.20:1'] },
  { format: FORMAT_35MM, aspectRatios: ['2.39:1'] },
  { format: DIGITAL_FORMAT, aspectRatios: ['2.39:1'] }
]

export const MOVIE_CATALOG: readonly MovieDefinition[] = [
  {
    name: 'The Odyssey',
    presentations: [
      { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
      { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
      { format: FORMAT_70MM, aspectRatios: ['2.20:1'] },
      { format: FORMAT_35MM, aspectRatios: ['2.39:1'] },
      {
        format: DOLBY_CINEMA_FORMAT,
        aspectRatios: ['1.85:1', '2.39:1']
      },
      {
        format: PREMIUM_LARGE_FORMAT,
        aspectRatios: ['1.85:1', '2.39:1']
      }
    ],
    media: THE_ODYSSEY_GALLERY
  },
  {
    // Everything outside IMAX was framed at 2.20:1
    name: 'Oppenheimer',
    presentations: [
      { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
      { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
      { format: FORMAT_70MM, aspectRatios: ['2.20:1'] },
      { format: FORMAT_35MM, aspectRatios: ['2.39:1'] },
      { format: DOLBY_CINEMA_FORMAT, aspectRatios: ['2.20:1'] },
      { format: PREMIUM_LARGE_FORMAT, aspectRatios: ['2.20:1'] },
      { format: DIGITAL_FORMAT, aspectRatios: ['2.20:1'] }
    ]
  },
  {
    name: 'Interstellar',
    presentations: FILM_PRINT_RELEASE
  },
  {
    name: 'Dunkirk',
    presentations: FILM_PRINT_RELEASE
  },
  {
    name: 'Sinners',
    presentations: [
      { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
      { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
      { format: FORMAT_70MM, aspectRatios: ['2.20:1'] },
      { format: FORMAT_35MM, aspectRatios: ['2.39:1'] },
      { format: DOLBY_CINEMA_FORMAT, aspectRatios: ['2.39:1'] },
      { format: PREMIUM_LARGE_FORMAT, aspectRatios: ['2.39:1'] },
      { format: DIGITAL_FORMAT, aspectRatios: ['2.39:1'] }
    ]
  },
  {
    name: 'The Dark Knight',
    presentations: [
      { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
      { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
      { format: FORMAT_35MM, aspectRatios: ['2.39:1'] },
      { format: DIGITAL_FORMAT, aspectRatios: ['2.39:1'] }
    ]
  },
  {
    // Shot at 1.90:1 but without a local IMAX engagement
    name: 'Spider-Man: Brand New Day',
    presentations: [
      {
        format: DOLBY_CINEMA_FORMAT,
        aspectRatios: ['1.90:1', '2.39:1']
      },
      {
        format: PREMIUM_LARGE_FORMAT,
        aspectRatios: ['1.90:1', '2.39:1']
      },
      { format: DIGITAL_FORMAT, aspectRatios: ['1.90:1', '2.39:1'] }
    ],
    media: SPIDER_MAN_BRAND_NEW_DAY_GALLERY
  },
  {
    name: 'Avengers: End Game',
    presentations: [
      { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
      { format: DOLBY_CINEMA_FORMAT, aspectRatios: ['2.39:1'] },
      { format: PREMIUM_LARGE_FORMAT, aspectRatios: ['2.39:1'] },
      { format: DIGITAL_FORMAT, aspectRatios: ['2.39:1'] }
    ]
  },
  {
    // Exclusively 1.85:1, wider auditoriums pillarbox it
    name: 'Toy Story 5',
    presentations: [
      { format: DOLBY_CINEMA_FORMAT, aspectRatios: ['1.85:1'] },
      { format: PREMIUM_LARGE_FORMAT, aspectRatios: ['1.85:1'] },
      { format: DIGITAL_FORMAT, aspectRatios: ['1.85:1'] }
    ]
  }
] as const
