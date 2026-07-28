export type BookingState = {
  currentMovieId: string
  showingIdByMovie: Record<string, string>
  ratioIndexByShowing: Record<string, number>
  selectedSeatsByShowing: Record<string, string[]>
  purchasedSeatsByShowing: Record<string, string[]>
  stillIndexByMovie: Record<string, number>
}

export type BookingAction =
  | { type: 'selectMovie'; movieId: string; defaultShowingId: string }
  | {
      type: 'selectShowing'
      showingId: string
      movieId: string
      hasMultipleRatios: boolean
      isAlreadyActive: boolean
    }
  | { type: 'toggleSeat'; showingId: string; seatId: string }
  | { type: 'confirmPurchase'; showingId: string }
  | { type: 'clearShowing'; showingId: string }
  | {
      type: 'stepStill'
      movieId: string
      offset: number
      total: number
    }

export function createInitialState(
  firstMovieId: string,
  firstShowingId: string
): BookingState {
  return {
    currentMovieId: firstMovieId,
    showingIdByMovie: { [firstMovieId]: firstShowingId },
    ratioIndexByShowing: {},
    selectedSeatsByShowing: {},
    purchasedSeatsByShowing: {},
    stillIndexByMovie: {}
  }
}
