'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Icons } from './icons'

export const CircleButtonBack = ({ className }: { className: string }) => {
  const route = useRouter()

  const handleClick = () => {
    route.back()
  }

  return (
    <Button
      size={'icon'}
      variant={'onlyIcon'}
      onClick={handleClick}
      className={className}
    >
      <Icons.arrowLeftIcon />
    </Button>
  )
}
