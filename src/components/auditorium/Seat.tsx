import type { SeatStatus } from '@/types/domain'
import { cn } from '@/lib/utils'

type SeatProps = {
  status: SeatStatus
  hasAisleAfter: boolean
  onToggle: () => void
}

export function Seat({ status, hasAisleAfter, onToggle }: SeatProps) {
  return (
    <button
      type='button'
      disabled={status === 'occupied'}
      aria-label={status}
      aria-pressed={status === 'selected'}
      data-aisle={hasAisleAfter ? 'true' : undefined}
      onClick={onToggle}
      className={cn(
        'seat m-0.5 h-4 w-5 cursor-pointer rounded-t-[20px] border border-seat-border transition-[background-color,box-shadow,scale] duration-150 ease-out-quad md:m-1 md:h-5 md:w-6 md:rounded-t-[25px] focus-visible:ring-seat-selected/80 focus-visible:ring-2 outline-none motion-safe:active:scale-[0.92]',
        status === 'available' &&
          'bg-seat-available hover:bg-seat-hover',
        status === 'selected' &&
          'bg-seat-selected shadow-seat-selected hover:bg-seat-selected',
        status === 'occupied' &&
          'cursor-default border-border bg-seat-occupied',
        hasAisleAfter && 'mr-4 md:mr-6'
      )}
    />
  )
}
