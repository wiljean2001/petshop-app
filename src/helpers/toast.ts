import { toast } from '@/components/ui/use-toast'

type variant = 'error' | 'success' | 'default' | 'warning' | 'destructive'

export const showToast = (message: string, type: variant) => {
  let title = ''
  let variant: variant = 'default'

  switch (type) {
    case 'error':
      title = 'Error:'
      variant = 'destructive'
      break
    case 'success':
      title = 'Completado:'
      variant = 'success'
      break
    case 'warning':
      title = 'Alerta:'
      variant = 'warning'
      break
  }

  return toast({
    title,
    variant,
    description: message,
    duration: 3000,
  })
}
