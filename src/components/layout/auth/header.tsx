import { cn } from '@/lib/utils'

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({
  heading,
  text,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <div
      // className={cn('flex flex-col md:flex-row md:items-center md:justify-between md:px-2 mb-4', className)}
      className='flex items-center justify-between md:px-2 mb-4'
    >
      <div className={cn('flex flex-col gap-1 align-top', className)}>
        <h1 className='font-semibold text-2xl md:text-3xl leading-none tracking-tight'>
          {heading}
        </h1>
        {text && (
          <p className='text-sm md:text-base text-muted-foreground'>{text}</p>
        )}
      </div>
      {children}
    </div>
  )
}
