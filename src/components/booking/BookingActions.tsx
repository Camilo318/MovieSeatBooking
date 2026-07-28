import { useState } from 'react'
import { toast } from 'sonner'
import { useBookingActions, useBookingDerived } from '@/state/BookingProvider'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

export function BookingActions() {
  const { currentMovie, currentShowing, selectedCount, total } =
    useBookingDerived()
  const { confirmPurchase, clearShowing } = useBookingActions()
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleBuyClick() {
    if (selectedCount === 0) {
      toast.error('No seats selected', {
        description: 'Please select some seats'
      })
      return
    }
    setDialogOpen(true)
  }

  function handleConfirm() {
    confirmPurchase()
    setDialogOpen(false)
    toast.success('Tickets Purchased!', {
      description: 'Enjoy the movie'
    })
  }

  function handleErase() {
    clearShowing()
  }

  return (
    <>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 border-white/20 bg-transparent font-[Bebas_Neue,PT_Sans,sans-serif] text-base tracking-[0.14em] text-white/75 uppercase hover:border-tomato hover:text-tomato hover:bg-transparent"
          onClick={handleErase}
        >
          Erase
        </Button>
        <Button
          className="flex-[2] bg-gradient-to-b from-[#f6c25c] to-[#dd9a2b] font-[Bebas_Neue,PT_Sans,sans-serif] text-base tracking-[0.14em] text-[#241a05] uppercase shadow-[0_6px_22px_rgba(240,178,62,0.28)] hover:-translate-y-px hover:from-[#f6c25c] hover:to-[#dd9a2b] hover:shadow-[0_10px_28px_rgba(240,178,62,0.4)]"
          onClick={handleBuyClick}
        >
          Buy Now
        </Button>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Movie And Payment</AlertDialogTitle>
            <AlertDialogDescription className="whitespace-pre-line">
              {`${currentMovie.title}\nSpots: ${selectedCount}\nTotal Payment: ${total}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
