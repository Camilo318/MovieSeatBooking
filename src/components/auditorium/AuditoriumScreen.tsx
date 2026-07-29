import {
  ASPECT_RATIO_VALUES,
  type AspectRatioId
} from '@/types/domain'

type AuditoriumScreenProps = {
  aspectRatio?: AspectRatioId
  still?: string
  movieTitle: string
  stillIndex: number
  stillTotal: number
}

export function AuditoriumScreen({
  aspectRatio,
  still,
  movieTitle,
  stillIndex,
  stillTotal
}: AuditoriumScreenProps) {
  const ratioValue = aspectRatio
    ? ASPECT_RATIO_VALUES[aspectRatio]
    : '1.85 / 1'

  return (
    <div
      className='screen w-full overflow-hidden rounded-sm transition-[aspect-ratio] duration-350 ease-in-out-cubic motion-reduce:transition-none'
      style={{ aspectRatio: ratioValue }}>
      {still ? (
        <img
          src={still}
          alt={`${movieTitle} still ${stillIndex + 1} of ${stillTotal}`}
          className='block size-full object-cover'
        />
      ) : null}
    </div>
  )
}
