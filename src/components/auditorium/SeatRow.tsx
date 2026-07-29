import type {
  Auditorium,
  Seat as SeatModel,
  SeatStatus
} from '@/types/domain'
import { Seat } from './Seat'

type SeatRowProps = {
  row: string
  seats: SeatModel[]
  auditorium: Auditorium
  getSeatStatus: (seatId: string) => SeatStatus
  onToggleSeat: (seatId: string) => void
}

export function SeatRow({
  row,
  seats,
  auditorium,
  getSeatStatus,
  onToggleSeat
}: SeatRowProps) {
  const aisleSet = new Set(auditorium.aisleAfter)

  return (
    <div className='row flex items-center justify-center transform-[rotateX(26deg)]'>
      <span className='w-[1.4rem] select-none text-center font-[Bebas_Neue,PT_Sans,sans-serif] text-[0.7rem] tracking-wide text-white/28 md:w-8 md:text-[0.8rem]'>
        {row}
      </span>
      {seats.map(seat => (
        <Seat
          key={seat.id}
          status={getSeatStatus(seat.id)}
          hasAisleAfter={aisleSet.has(seat.number)}
          onToggle={() => onToggleSeat(seat.id)}
        />
      ))}
      <span className='w-[1.4rem] select-none text-center font-[Bebas_Neue,PT_Sans,sans-serif] text-[0.7rem] tracking-wide text-white/28 md:w-8 md:text-[0.8rem]'>
        {row}
      </span>
    </div>
  )
}
