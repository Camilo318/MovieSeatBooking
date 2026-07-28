import type { BookingAction, BookingState } from './types'

export function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.type) {
    case 'selectMovie':
      return {
        ...state,
        currentMovieId: action.movieId,
        showingIdByMovie: {
          ...state.showingIdByMovie,
          [action.movieId]:
            state.showingIdByMovie[action.movieId] ??
            action.defaultShowingId
        }
      }

    case 'selectShowing': {
      if (action.isAlreadyActive) {
        const currentIndex =
          state.ratioIndexByShowing[action.showingId] ?? 0
        return {
          ...state,
          ratioIndexByShowing: {
            ...state.ratioIndexByShowing,
            [action.showingId]: action.hasMultipleRatios
              ? currentIndex + 1
              : currentIndex
          }
        }
      }

      return {
        ...state,
        showingIdByMovie: {
          ...state.showingIdByMovie,
          [action.movieId]: action.showingId
        },
        ratioIndexByShowing: {
          ...state.ratioIndexByShowing,
          [action.showingId]: 0
        }
      }
    }

    case 'toggleSeat': {
      const current =
        state.selectedSeatsByShowing[action.showingId] ?? []
      const next = current.includes(action.seatId)
        ? current.filter(id => id !== action.seatId)
        : [...current, action.seatId]

      return {
        ...state,
        selectedSeatsByShowing: {
          ...state.selectedSeatsByShowing,
          [action.showingId]: next
        }
      }
    }

    case 'confirmPurchase': {
      const selected =
        state.selectedSeatsByShowing[action.showingId] ?? []
      if (selected.length === 0) return state

      const purchased =
        state.purchasedSeatsByShowing[action.showingId] ?? []
      return {
        ...state,
        purchasedSeatsByShowing: {
          ...state.purchasedSeatsByShowing,
          [action.showingId]: [...purchased, ...selected]
        },
        selectedSeatsByShowing: {
          ...state.selectedSeatsByShowing,
          [action.showingId]: []
        }
      }
    }

    case 'clearShowing':
      return {
        ...state,
        selectedSeatsByShowing: {
          ...state.selectedSeatsByShowing,
          [action.showingId]: []
        },
        purchasedSeatsByShowing: {
          ...state.purchasedSeatsByShowing,
          [action.showingId]: []
        }
      }

    case 'stepStill': {
      if (action.total === 0) return state
      const current = state.stillIndexByMovie[action.movieId] ?? 0
      const next =
        (current + action.offset + action.total) % action.total
      return {
        ...state,
        stillIndexByMovie: {
          ...state.stillIndexByMovie,
          [action.movieId]: next
        }
      }
    }

    default:
      return state
  }
}
