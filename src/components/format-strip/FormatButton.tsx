import type { Showing } from '@/types/domain'
import { cn } from '@/lib/utils'
import { getFormatArtwork } from '@/components/formats/artwork'
import { RatioBadges } from './RatioBadges'
import { getActiveRatioIndex } from '@/state/selectors'
import { useBookingState } from '@/state/BookingProvider'

type FormatButtonProps = {
  showing: Showing
  isActive: boolean
  onSelect: (showingId: string) => void
}

export function FormatButton({
  showing,
  isActive,
  onSelect
}: FormatButtonProps) {
  const state = useBookingState()
  const { Graphic, Logo } = getFormatArtwork(showing.format.id)
  const hasMultiple = showing.aspectRatios.length > 1
  const activeRatioIndex = getActiveRatioIndex(
    state,
    showing.id,
    showing.aspectRatios.length
  )

  return (
    <button
      type='button'
      role='listitem'
      aria-pressed={isActive}
      title={showing.format.info ?? showing.format.name}
      onClick={() => onSelect(showing.id)}
      className={cn(
        'flex shrink-0 snap-start cursor-pointer flex-col items-center justify-start rounded-lg border border-border bg-white/3 p-2 text-white/78 transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-white/26 hover:text-white/92',
        'h-13 w-17 opacity-80',
        hasMultiple && 'w-22',
        isActive && 'bg-format-active opacity-100',
        'md:h-23.5 md:w-23.5 md:rounded md:p-2.5'
      )}>
      <div className='mb-0.5 hidden h-7 w-10 items-center justify-center md:mb-2 md:flex [&_svg]:block [&_svg]:h-auto [&_svg]:w-full'>
        <Graphic />
      </div>
      <div className='mb-0.5 flex min-h-5.5 w-11 shrink-0 items-center justify-center md:mb-1 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full'>
        <Logo />
      </div>
      <RatioBadges
        aspectRatios={showing.aspectRatios}
        activeRatioIndex={activeRatioIndex}
        isActive={isActive}
      />
    </button>
  )
}
