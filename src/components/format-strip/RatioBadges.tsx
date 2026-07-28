import type { AspectRatioId } from '@/types/domain'
import { cn } from '@/lib/utils'

type RatioBadgesProps = {
  aspectRatios: readonly AspectRatioId[]
  activeRatioIndex: number
  isActive: boolean
}

export function RatioBadges({
  aspectRatios,
  activeRatioIndex,
  isActive
}: RatioBadgesProps) {
  if (aspectRatios.length <= 1) {
    return (
      <span
        className={cn(
          'text-xs font-normal leading-none',
          isActive ? 'text-white' : 'text-white/88'
        )}
      >
        {aspectRatios[0] ?? 'TBD'}
      </span>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {aspectRatios.map((ratio, index) => (
        <span
          key={ratio + index}
          className={cn(
            'text-xs font-normal leading-none transition-colors duration-200',
            index > 0 && 'text-white/72',
            isActive && index !== activeRatioIndex && 'text-white/40',
            isActive && index === activeRatioIndex && 'text-white'
          )}
        >
          {ratio}
        </span>
      ))}
    </div>
  )
}
