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
      <select
        id="movie"
        value={currentMovie.id}
        onChange={e => selectMovie(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-md border border-white/14 bg-white/5 px-4 py-3 pr-10 text-sm text-white outline-none transition-colors hover:border-accent-bright focus:border-accent-bright"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%238cb8ff' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center'
        }}
      >
        {MOVIE_CATALOG.map(movie => (
          <option key={movie.id} value={movie.id} className="bg-panel-strong text-white">
            {movie.title} (from ${getLowestPrice(movie)})
          </option>
        ))}
      </select>
    </div>
  )
}
