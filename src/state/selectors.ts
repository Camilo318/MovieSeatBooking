import type {
  AspectRatioId,
  Movie,
  SeatStatus,
  Showing
} from '@/types/domain'
import { getBaselineOccupancy } from '@/domain/occupancy'
import {
  getShowingById,
  getShowingsForMovie,
  MOVIE_CATALOG
} from '@/data/movies'
import type { BookingState } from './types'

export function getCurrentMovie(state: BookingState): Movie {
  return (
    MOVIE_CATALOG.find(m => m.id === state.currentMovieId) ?? MOVIE_CATALOG[0]
  )
}

export function getCurrentShowingId(state: BookingState): string {
  const movie = getCurrentMovie(state)
  return (
    state.showingIdByMovie[movie.id] ??
    getShowingsForMovie(movie)[0]?.id ??
    ''
  )
}

export function getCurrentShowing(state: BookingState): Showing {
  const id = getCurrentShowingId(state)
  return getShowingById(id) ?? getShowingsForMovie(getCurrentMovie(state))[0]
}

export function getActiveRatioIndex(
  state: BookingState,
  showingId: string,
  ratioCount: number
): number {
  const index = state.ratioIndexByShowing[showingId] ?? 0
  return ratioCount > 0 ? index % ratioCount : 0
}

export function getActiveAspectRatio(
  state: BookingState,
  showing: Showing
): AspectRatioId | undefined {
  const index = getActiveRatioIndex(
    state,
    showing.id,
    showing.aspectRatios.length
  )
  return showing.aspectRatios[index]
}

export function getSelectedSeats(
  state: BookingState,
  showingId: string
): string[] {
  return state.selectedSeatsByShowing[showingId] ?? []
}

export function getOccupiedSeats(
  state: BookingState,
  showing: Showing
): Set<string> {
  const baseline = getBaselineOccupancy(showing.id, showing.auditorium)
  const purchased = state.purchasedSeatsByShowing[showing.id] ?? []
  return new Set([...baseline, ...purchased])
}

export function getSeatStatus(
  state: BookingState,
  showing: Showing,
  seatId: string
): SeatStatus {
  const selected = getSelectedSeats(state, showing.id)
  if (selected.includes(seatId)) return 'selected'
  if (getOccupiedSeats(state, showing).has(seatId)) return 'occupied'
  return 'available'
}

export function getTicketPrice(showing: Showing): number {
  return showing.format.price
}

export function getSelectedCount(state: BookingState, showingId: string): number {
  return getSelectedSeats(state, showingId).length
}

export function getTotal(state: BookingState, showing: Showing): number {
  return getSelectedCount(state, showing.id) * getTicketPrice(showing)
}

export function getCurrentStill(
  state: BookingState,
  movie: Movie
): string | undefined {
  const stills = movie.stills ?? []
  if (stills.length === 0) return undefined
  const index = state.stillIndexByMovie[movie.id] ?? 0
  return stills[index]
}

export function hasStillGallery(movie: Movie): boolean {
  return (movie.stills?.length ?? 0) > 1
}
