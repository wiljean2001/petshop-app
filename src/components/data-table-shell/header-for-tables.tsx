'use client'
import Link from 'next/link'
import { Icons } from '../icons'
import { Button, buttonVariants } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface AddItemProps {
  title: string
  options: {
    title: string
    onHandled: () => void
  }[]
  onHandledDownload?: () => void
}

const AddItem = ({ title, options }: AddItemProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          //   variant='outline'
          size='sm'
          className='ml-auto h-8'
        >
          <Icons.add />
          <span className='hidden md:block'>{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map(({ title, onHandled }, index) => {
          return (
            <DropdownMenuItem onClick={onHandled} key={index}>
              {title}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DashboardOptionsProps {
  options?: {
    title: string
    onHandled: () => void
  }[]
  onHandledDownload: string
  children: React.ReactNode
}
export const DashboardOptions = ({
  options,
  onHandledDownload,
  children,
}: DashboardOptionsProps) => {
  return (
    <>
      <div className='flex flex-wrap gap-2'>
        {/* Dropdown for select options: "add clinic", "import clinics" */}
        {options && <AddItem options={options} title={options[0].title} />}
        <Link
          href={onHandledDownload}
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <Icons.download className='w-4' />
        </Link>
      </div>
      {children}
    </>
  )
}
