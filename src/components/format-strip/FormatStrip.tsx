import {
  useBookingActions,
  useBookingDerived
} from '@/state/BookingProvider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormatButton } from './FormatButton'

export function FormatStrip() {
  const { showings, currentShowingId } = useBookingDerived()
  const { selectShowing } = useBookingActions()

  if (showings.length === 0) {
    return (
      <section
        className='w-full border-b border-white/8 bg-void/72 px-4 py-4 backdrop-blur-[22px]'
        aria-labelledby='format-strip-title'>
        <div className='mx-auto w-full max-w-295'>
          <p className='m-0 text-sm text-muted-foreground'>
            No premium formats listed for this title.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      className='w-full border-b border-white/8 bg-void/72 py-4 pt-[1.1rem] pb-3 backdrop-blur-[22px]'
      aria-labelledby='format-strip-title'>
      <div className='mx-auto w-full max-w-295 px-2'>
        <p
          id='format-strip-title'
          className='mb-3 text-[0.8rem] tracking-[0.24em] text-muted-foreground uppercase'>
          Available Formats
        </p>
        <ScrollArea className='w-full pt-1 scrollbar-none'>
          <div
            className='flex w-fit items-center justify-start gap-2 px-6 sm:mx-auto'
            role='list'
            aria-label='Movie format selector'>
            {showings.map(showing => (
              <FormatButton
                key={showing.id}
                showing={showing}
                isActive={showing.id === currentShowingId}
                onSelect={selectShowing}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  )
}
