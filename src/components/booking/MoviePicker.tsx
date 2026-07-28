import { ChevronDownIcon } from 'lucide-react'
import { getLowestPrice, MOVIE_CATALOG } from '@/data/movies'
import {
  useBookingActions,
  useBookingDerived
} from '@/state/BookingProvider'

export function MoviePicker() {
  const { currentMovie } = useBookingDerived()
  const { selectMovie } = useBookingActions()

  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor="movie"
        className="font-[Bebas_Neue,PT_Sans,sans-serif] text-[0.95rem] tracking-[0.28em] text-muted-foreground uppercase"
      >
        Now showing
      </label>
      <div className="relative">
        <select
          id="movie"
          value={currentMovie.id}
          onChange={e => selectMovie(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-md border border-white/14 bg-input px-4 py-3 pr-10 text-sm text-foreground outline-none transition-colors hover:border-accent-bright focus:border-accent-bright"
        >
          {MOVIE_CATALOG.map(movie => (
            <option key={movie.id} value={movie.id} className="bg-panel-strong text-foreground">
              {movie.title} (from ${getLowestPrice(movie)})
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-3.5 -translate-y-1/2 text-accent-bright"
        />
      </div>
    </div>
  )
}
