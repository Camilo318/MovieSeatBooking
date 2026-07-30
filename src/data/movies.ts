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
  SPIDER_MAN_BRAND_NEW_DAY_STILLS,
  THE_ODYSSEY_STILLS,
  INTERSTELLAR_STILLS,
  OPPENHEIMER_STILLS,
  THE_DARK_KNIGHT_STILLS,
  SINNER_STILLS
} from './stills'
import type { FormatOption, Movie, Showing } from '@/types/domain'
import { getAuditoriumForFormat } from './auditoriums'

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const FILM_PRINT_RELEASE: readonly FormatOption[] = [
  { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
  { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
  { format: FORMAT_70MM, aspectRatios: ['2.20:1'] },
  { format: FORMAT_35MM, aspectRatios: ['2.39:1'] },
  { format: DIGITAL_FORMAT, aspectRatios: ['2.39:1'] }
]

export const MOVIE_CATALOG: readonly Movie[] = [
  {
    id: slugify('The Odyssey'),
    title: 'The Odyssey',
    formatOptions: [
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
    stills: THE_ODYSSEY_STILLS
  },
  {
    id: slugify('Oppenheimer'),
    title: 'Oppenheimer',
    formatOptions: [
      { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
      { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
      { format: FORMAT_70MM, aspectRatios: ['2.20:1'] },
      { format: FORMAT_35MM, aspectRatios: ['2.39:1'] },
      { format: DOLBY_CINEMA_FORMAT, aspectRatios: ['2.20:1'] },
      { format: PREMIUM_LARGE_FORMAT, aspectRatios: ['2.20:1'] },
      { format: DIGITAL_FORMAT, aspectRatios: ['2.20:1'] }
    ],
    stills: OPPENHEIMER_STILLS
  },
  {
    id: slugify('Interstellar'),
    title: 'Interstellar',
    formatOptions: FILM_PRINT_RELEASE,
    stills: INTERSTELLAR_STILLS
  },
  {
    id: slugify('Sinners'),
    title: 'Sinners',
    formatOptions: [
      { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
      { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
      { format: FORMAT_70MM, aspectRatios: ['2.76:1'] },
      { format: DOLBY_CINEMA_FORMAT, aspectRatios: ['2.76:1'] },
      { format: PREMIUM_LARGE_FORMAT, aspectRatios: ['2.76:1'] },
      { format: DIGITAL_FORMAT, aspectRatios: ['2.76:1'] }
    ],
    stills: SINNER_STILLS
  },
  {
    id: slugify('The Dark Knight'),
    title: 'The Dark Knight',
    formatOptions: [
      { format: IMAX_70MM_FORMAT, aspectRatios: ['1.43:1'] },
      { format: IMAX_FORMAT, aspectRatios: ['1.90:1'] },
      { format: FORMAT_35MM, aspectRatios: ['2.39:1'] },
      { format: DIGITAL_FORMAT, aspectRatios: ['2.39:1'] }
    ],
    stills: THE_DARK_KNIGHT_STILLS
  },
  {
    id: slugify('Spider-Man: Brand New Day'),
    title: 'Spider-Man: Brand New Day',
    formatOptions: [
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
    stills: SPIDER_MAN_BRAND_NEW_DAY_STILLS
  }
] as const

export function makeShowingId(
  movieId: string,
  formatId: string
): string {
  return `${movieId}:${formatId}`
}

function buildShowing(movie: Movie, option: FormatOption): Showing {
  return {
    id: makeShowingId(movie.id, option.format.id),
    movieId: movie.id,
    movieTitle: movie.title,
    format: option.format,
    aspectRatios: option.aspectRatios,
    auditorium: getAuditoriumForFormat(option.format.id),
    stills: movie.stills ?? []
  }
}

export function getShowingsForMovie(movie: Movie): Showing[] {
  return movie.formatOptions.map(option =>
    buildShowing(movie, option)
  )
}

export function getShowingById(
  showingId: string
): Showing | undefined {
  for (const movie of MOVIE_CATALOG) {
    for (const option of movie.formatOptions) {
      if (makeShowingId(movie.id, option.format.id) === showingId) {
        return buildShowing(movie, option)
      }
    }
  }
  return undefined
}

export function getLowestPrice(movie: Movie): number {
  return movie.formatOptions.reduce(
    (cheapest, { format }) => Math.min(cheapest, format.price),
    Infinity
  )
}
