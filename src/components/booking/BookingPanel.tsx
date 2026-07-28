import { MoviePicker } from './MoviePicker'
import { SeatLegend } from './SeatLegend'
import { OrderSummary } from './OrderSummary'
import { BookingActions } from './BookingActions'

export function BookingPanel() {
  return (
    <aside
      className='flex flex-col gap-5 rounded-2xl border border-white/9 bg-linear-to-br from-panel-from/85 to-panel-to/92 p-5 shadow-panel lg:sticky lg:top-5 lg:w-82.5 lg:shrink-0'
      aria-label='Booking controls'>
      <MoviePicker />
      <SeatLegend />
      <OrderSummary />
      <BookingActions />
    </aside>
  )
}
