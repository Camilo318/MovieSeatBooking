import { ScreenGallery } from './ScreenGallery'
import { SeatMap } from './SeatMap'

export function Auditorium() {
  return (
    <section
      className="auditorium relative flex flex-1 flex-col items-center gap-7 overflow-hidden rounded-[1.25rem] border border-white/6 px-4 py-9 md:px-8 md:py-12 lg:min-w-0"
      aria-label="Auditorium"
    >
      <ScreenGallery />
      <SeatMap />
    </section>
  )
}
