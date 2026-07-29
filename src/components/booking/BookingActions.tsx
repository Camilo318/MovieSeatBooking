import { useState } from 'react'
import { toast } from 'sonner'
import {
  useBookingActions,
  useBookingDerived
} from '@/state/BookingProvider'
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
      <div className='flex gap-3'>
        <Button
          variant='outline'
          className='flex-1 border-white/20 bg-transparent font-[Bebas_Neue,PT_Sans,sans-serif] text-base tracking-[0.14em] text-white/75 uppercase hover:border-danger hover:text-danger hover:bg-transparent'
          onClick={handleErase}>
          Erase
        </Button>
        <Button
          className='flex-2 bg-linear-to-b from-marquee-from to-marquee-to font-[Bebas_Neue,PT_Sans,sans-serif] text-base tracking-[0.14em] text-marquee-foreground uppercase shadow-marquee hover:-translate-y-px hover:from-marquee-from hover:to-marquee-to hover:shadow-marquee-lg'
          onClick={handleBuyClick}>
          Buy Now
        </Button>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm Movie And Payment
            </AlertDialogTitle>
            <AlertDialogDescription className='whitespace-pre-line'>
              {`${currentMovie.title}\nSpots: ${selectedCount}\nTotal Payment: ${total}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
