export function SeatLegend() {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-[Bebas_Neue,PT_Sans,sans-serif] text-[0.95rem] tracking-[0.28em] text-muted-foreground uppercase">
        Seat legend
      </p>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        <li className="flex items-center gap-3">
          <div className="seat seat--legend" />
          <small className="text-sm text-white/82">Available</small>
        </li>
        <li className="flex items-center gap-3">
          <div className="seat seat--legend seat--selected" />
          <small className="text-sm text-white/82">Selected</small>
        </li>
        <li className="flex items-center gap-3">
          <div className="seat seat--legend seat--occupied" />
          <small className="text-sm text-white/82">Occupied</small>
        </li>
      </ul>
    </div>
  )
}
