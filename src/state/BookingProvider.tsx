import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode
} from 'react'
import { bookingReducer } from './bookingReducer'
import { createInitialState, type BookingState } from './types'
import {
  getActiveAspectRatio,
  getCurrentMovie,
  getCurrentShowing,
  getCurrentStill,
  getSelectedCount,
  getTicketPrice,
  getTotal,
  hasStillGallery
} from './selectors'
import {
  getShowingsForMovie,
  makeShowingId,
  MOVIE_CATALOG
} from '@/data/movies'
import type { AspectRatioId, Movie, Showing } from '@/types/domain'

const BookingStateContext = createContext<BookingState | null>(null)
const BookingActionsContext = createContext<BookingActions | null>(
  null
)
const BookingDerivedContext = createContext<BookingDerived | null>(
  null
)

export type BookingActions = {
  selectMovie: (movieId: string) => void
  selectShowing: (showingId: string) => void
  toggleSeat: (seatId: string) => void
  confirmPurchase: () => void
  clearShowing: () => void
  stepStill: (offset: number) => void
}

export type BookingDerived = {
  currentMovie: Movie
  currentShowing: Showing
  currentShowingId: string
  activeAspectRatio: AspectRatioId | undefined
  ticketPrice: number
  selectedCount: number
  total: number
  currentStill: string | undefined
  hasGallery: boolean
  showings: Showing[]
}

export function BookingProvider({
  children
}: {
  children: ReactNode
}) {
  const firstMovie = MOVIE_CATALOG[0]
  const firstShowingId = makeShowingId(
    firstMovie.id,
    firstMovie.formatOptions[0].format.id
  )

  const [state, dispatch] = useReducer(
    bookingReducer,
    createInitialState(firstMovie.id, firstShowingId)
  )

  const currentMovie = useMemo(() => getCurrentMovie(state), [state])
  const currentShowing = useMemo(
    () => getCurrentShowing(state),
    [state]
  )
  const currentShowingId = currentShowing.id

  const derived: BookingDerived = useMemo(
    () => ({
      currentMovie,
      currentShowing,
      currentShowingId,
      activeAspectRatio: getActiveAspectRatio(state, currentShowing),
      ticketPrice: getTicketPrice(currentShowing),
      selectedCount: getSelectedCount(state, currentShowingId),
      total: getTotal(state, currentShowing),
      currentStill: getCurrentStill(state, currentMovie),
      hasGallery: hasStillGallery(currentMovie),
      showings: getShowingsForMovie(currentMovie)
    }),
    [state, currentMovie, currentShowing, currentShowingId]
  )

  const actions: BookingActions = useMemo(
    () => ({
      selectMovie: (movieId: string) => {
        const movie = MOVIE_CATALOG.find(m => m.id === movieId)
        if (!movie) return
        const defaultShowingId = makeShowingId(
          movie.id,
          movie.formatOptions[0].format.id
        )
        dispatch({ type: 'selectMovie', movieId, defaultShowingId })
      },

      selectShowing: (targetShowingId: string) => {
        const showing = getShowingsForMovie(currentMovie).find(
          s => s.id === targetShowingId
        )
        if (!showing) return

        dispatch({
          type: 'selectShowing',
          showingId: targetShowingId,
          movieId: currentMovie.id,
          hasMultipleRatios: showing.aspectRatios.length > 1,
          isAlreadyActive: targetShowingId === currentShowingId
        })
      },

      toggleSeat: (seatId: string) => {
        dispatch({
          type: 'toggleSeat',
          showingId: currentShowingId,
          seatId
        })
      },

      confirmPurchase: () => {
        dispatch({
          type: 'confirmPurchase',
          showingId: currentShowingId
        })
      },

      clearShowing: () => {
        dispatch({
          type: 'clearShowing',
          showingId: currentShowingId
        })
      },

      stepStill: (offset: number) => {
        const total = currentMovie.stills?.length ?? 0
        dispatch({
          type: 'stepStill',
          movieId: currentMovie.id,
          offset,
          total
        })
      }
    }),
    [currentMovie, currentShowingId]
  )

  return (
    <BookingStateContext.Provider value={state}>
      <BookingActionsContext.Provider value={actions}>
        <BookingDerivedContext.Provider value={derived}>
          {children}
        </BookingDerivedContext.Provider>
      </BookingActionsContext.Provider>
    </BookingStateContext.Provider>
  )
}

export function useBookingState(): BookingState {
  const ctx = useContext(BookingStateContext)
  if (!ctx)
    throw new Error(
      'useBookingState must be used within BookingProvider'
    )
  return ctx
}

export function useBookingActions(): BookingActions {
  const ctx = useContext(BookingActionsContext)
  if (!ctx)
    throw new Error(
      'useBookingActions must be used within BookingProvider'
    )
  return ctx
}

export function useBookingDerived(): BookingDerived {
  const ctx = useContext(BookingDerivedContext)
  if (!ctx)
    throw new Error(
      'useBookingDerived must be used within BookingProvider'
    )
  return ctx
}
