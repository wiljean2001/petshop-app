import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type variants = 'error' | 'success' | 'warning'
type variant = 'success' | 'warning' | 'destructive' | 'default'

/**
 *
 * @param message - The message to display
 * @param type - The type of message to display
 * @param action - The action to execute when click the button
 * @param titleAction - The title action to display for the button
 * @returns Toast
 */
export const showToast = (
  message: string,
  type: variants,
  action?: () => void,
  titleAction: string = 'Confirmar'
) => {
  let title: any
  let variant: variant
  let icon: ReactNode

  switch (type) {
    case 'error':
      variant = 'destructive'
      icon = <Icons.alertCircle className='w-4 ' />
      title = (
        <div className='flex items-center gap-4'>
          {icon} <strong>Error:</strong>
        </div>
      )
      break
    case 'success':
      variant = 'success'
      icon = <Icons.checkCircle2Icon className='w-4 ' />
      title = (
        <div className='flex items-center gap-4'>
          {icon} <strong>Completado:</strong>
        </div>
      )

      break
    case 'warning':
      variant = 'warning'
      icon = <Icons.warning className='w-4 ' />
      title = (
        <div className='flex items-center gap-4'>
          {icon} <strong>Advertencia:</strong>
        </div>
      )
      break
  }

  return toast({
    title,
    variant: variant,
    description: (
      <div className='flex'>
        <div className='w-8'></div>
        <p className='font-semibold'>{message}</p>
      </div>
    ),
    duration: 10000,
    action: action ? (
      <ToastAction
        altText='Confirm'
        onClick={action}
        className={cn(
          buttonVariants({
            variant: 'default',
          })
        )}
      >
        {titleAction}
      </ToastAction>
    ) : undefined,
  })
}
