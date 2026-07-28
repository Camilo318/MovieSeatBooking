import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useBookingActions, useBookingDerived } from '@/state/BookingProvider'
import { Button } from '@/components/ui/button'
import { AuditoriumScreen } from './AuditoriumScreen'
import { useBookingState } from '@/state/BookingProvider'

export function ScreenGallery() {
  const { currentMovie, currentStill, activeAspectRatio, hasGallery } =
    useBookingDerived()
  const { stepStill } = useBookingActions()
  const state = useBookingState()
  const stillIndex = state.stillIndexByMovie[currentMovie.id] ?? 0
  const stillTotal = currentMovie.stills?.length ?? 0

  return (
    <div className="auditorium__stage flex w-full flex-col items-center">
      <div className="screen-frame relative mx-auto w-full max-w-[680px] lg:max-w-[760px]">
        <AuditoriumScreen
          aspectRatio={activeAspectRatio}
          still={currentStill}
          movieTitle={currentMovie.title}
          stillIndex={stillIndex}
          stillTotal={stillTotal}
        />

        {hasGallery && (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous still"
              onClick={() => stepStill(-1)}
              className="screen-nav absolute top-1/2 left-2.5 size-[34px] -translate-y-1/2 rounded-full border-white/18 bg-[rgba(6,8,14,0.45)] text-white/82 opacity-30 backdrop-blur-sm hover:opacity-100 hover:bg-[rgba(6,8,14,0.72)] hover:border-white/34"
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next still"
              onClick={() => stepStill(1)}
              className="screen-nav absolute top-1/2 right-2.5 size-[34px] -translate-y-1/2 rounded-full border-white/18 bg-[rgba(6,8,14,0.45)] text-white/82 opacity-30 backdrop-blur-sm hover:opacity-100 hover:bg-[rgba(6,8,14,0.72)] hover:border-white/34"
            >
              <ChevronRightIcon />
            </Button>
          </>
        )}
      </div>
      <p className="mt-3.5 mb-0 font-[Bebas_Neue,PT_Sans,sans-serif] text-[0.85rem] tracking-[0.55em] text-white/38 uppercase indent-[0.55em]">
        Screen
      </p>
    </div>
  )
}
