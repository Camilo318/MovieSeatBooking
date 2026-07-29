import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

type AlertDialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const AlertDialogContext =
  React.createContext<AlertDialogContextValue | null>(null)

function AlertDialog({
  open,
  onOpenChange,
  children
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : internalOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  return (
    <AlertDialogContext.Provider
      value={{ open: currentOpen, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

function AlertDialogContent({
  className,
  children
}: React.ComponentProps<'div'>) {
  const ctx = React.useContext(AlertDialogContext)
  if (!ctx?.open) return null

  return createPortal(
    <>
      <div
        className='fixed inset-0 z-50 bg-overlay'
        onClick={() => ctx.setOpen(false)}
        aria-hidden='true'
      />
      <div
        role='alertdialog'
        aria-modal='true'
        className={cn(
          'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border bg-background p-6 shadow-lg sm:max-w-lg',
          className
        )}>
        {children}
      </div>
    </>,
    document.body
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 text-center sm:text-left',
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  onClick,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      type='button'
      className={cn(buttonVariants(), className)}
      onClick={onClick}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const ctx = React.useContext(AlertDialogContext)

  return (
    <button
      type='button'
      className={cn(
        buttonVariants({
          variant: 'outline',
          className:
            'hover:border-danger hover:text-danger hover:bg-transparent'
        }),
        className
      )}
      onClick={() => ctx?.setOpen(false)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
}
