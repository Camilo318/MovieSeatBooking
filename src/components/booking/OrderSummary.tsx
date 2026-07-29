import { useBookingDerived } from '@/state/BookingProvider'

export function OrderSummary() {
  const { currentShowing, ticketPrice, selectedCount, total } =
    useBookingDerived()

  return (
    <div className="flex flex-col gap-2 border-t border-white/8 pt-5">
      <p className="font-[Bebas_Neue,PT_Sans,sans-serif] text-[0.95rem] tracking-[0.28em] text-muted-foreground uppercase">
        Your order
      </p>
      <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-white/10 pb-2.5 mb-1.5">
        <span className="text-sm tracking-wide text-white/90">
          {currentShowing.format.name}
        </span>
        <span className="shrink-0 text-xs text-accent-bright whitespace-nowrap">
          ${ticketPrice} / ticket
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">Seats</span>
        <span className="font-[Bebas_Neue,PT_Sans,sans-serif] text-2xl tracking-wide text-white">
          {selectedCount}
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="font-[Bebas_Neue,PT_Sans,sans-serif] text-2xl tracking-wide text-marquee">
          ${total}
        </span>
      </div>
    </div>
  )
}
