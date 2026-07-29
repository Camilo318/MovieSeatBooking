import { BookingProvider } from '@/state/BookingProvider'
import { Toaster } from '@/components/ui/sonner'
import { FormatStrip } from '@/components/format-strip/FormatStrip'
import { BookingPanel } from '@/components/booking/BookingPanel'
import { Auditorium } from '@/components/auditorium/Auditorium'

export function App() {
  return (
    <BookingProvider>
      <FormatStrip />
      <main className='mx-auto my-6 mb-12 flex w-full max-w-295 flex-col-reverse gap-6 px-3 lg:flex-row lg:items-start lg:gap-7'>
        <BookingPanel />
        <Auditorium />
      </main>
      <Toaster />
    </BookingProvider>
  )
}
