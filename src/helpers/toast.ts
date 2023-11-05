import { toast } from '@/components/ui/use-toast'

type variants = 'error' | 'success' | 'warning'
type variant = 'success' | 'warning' | 'destructive' | 'default'

export const showToast = (message: string, type: variants) => {
  let title
  let variant: variant

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
    duration: 3500,
  })
}
