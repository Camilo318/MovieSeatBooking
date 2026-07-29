import { useMemo } from 'react'
import {
  useBookingActions,
  useBookingDerived,
  useBookingState
} from '@/state/BookingProvider'
import { buildSeatGrid } from '@/domain/seats'
import { getSeatStatus } from '@/state/selectors'
import { SeatRow } from './SeatRow'
import { ScrollArea } from '@/components/ui/scroll-area'

export function SeatMap() {
  const state = useBookingState()
  const { currentShowing } = useBookingDerived()
  const { toggleSeat } = useBookingActions()

  const seatsByRow = useMemo(() => {
    const allSeats = buildSeatGrid(currentShowing.auditorium)
    const map = new Map<string, typeof allSeats>()

    for (const seat of allSeats) {
      const row = map.get(seat.row) ?? []
      row.push(seat)
      map.set(seat.row, row)
    }

    return map
  }, [currentShowing.auditorium])

  return (
    <ScrollArea className='w-full overflow-x-auto md:overflow-x-visible scrollbar-none'>
      <div className='seat-map mx-auto flex w-fit flex-col gap-2'>
        {[...seatsByRow.entries()].map(([row, seats]) => (
          <SeatRow
            key={row}
            row={row}
            seats={seats}
            auditorium={currentShowing.auditorium}
            getSeatStatus={seatId =>
              getSeatStatus(state, currentShowing, seatId)
            }
            onToggleSeat={toggleSeat}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
