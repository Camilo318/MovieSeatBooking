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
      type="button"
      disabled={status === 'occupied'}
      aria-label={status}
      aria-pressed={status === 'selected'}
      data-aisle={hasAisleAfter ? 'true' : undefined}
      onClick={onToggle}
      className={cn(
        'seat m-[3px] h-3.5 w-4 cursor-pointer rounded-t-[20px] border border-black/55 transition-all duration-200 md:m-[5px] md:h-[21px] md:w-6 md:rounded-t-[25px]',
        status === 'available' && 'bg-seat-available hover:bg-[#4d566f]',
        status === 'selected' &&
          'bg-seat-selected shadow-[0_0_10px_rgba(111,234,246,0.55)] hover:bg-seat-selected',
        status === 'occupied' &&
          'cursor-default border-white/12 bg-seat-occupied',
        hasAisleAfter && 'mr-[18px] md:mr-7'
      )}
    />
  )
}
