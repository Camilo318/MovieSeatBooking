import { MoviePicker } from './MoviePicker'
import { SeatLegend } from './SeatLegend'
import { OrderSummary } from './OrderSummary'
import { BookingActions } from './BookingActions'

export function BookingPanel() {
  return (
    <aside
      className='flex flex-col gap-5 rounded-2xl border border-white/9 bg-linear-to-br from-[rgba(21,26,40,0.85)] to-[rgba(10,12,20,0.92)] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:sticky lg:top-5 lg:w-82.5 lg:shrink-0'
      aria-label='Booking controls'>
      <MoviePicker />
      <SeatLegend />
      <OrderSummary />
      <BookingActions />
    </aside>
  )
}
