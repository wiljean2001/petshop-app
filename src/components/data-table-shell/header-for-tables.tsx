'use client'
import { Icons } from '../icons'
import { Button } from '../ui/button'
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
          {title}
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

export const HeaderWithButton = ({
  title,
  options,
  onHandledDownload,
}: AddItemProps) => {
  return (
    <div className='flex justify-between'>
      <h3 className='text-2xl font-semibold leading-none tracking-tight'>
        {title}
      </h3>
      <div className='flex gap-2'>
        {/* Dropdown for select options: "add clinic", "import clinics" */}
        <AddItem options={options} title={title} />
        <Button variant={'outline'} size={'icon'} onClick={onHandledDownload}>
          <Icons.download className='w-4' />
        </Button>
      </div>
    </div>
  )
}
