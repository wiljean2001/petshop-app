import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'
import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'
import { Icons } from '../icons'
import { es } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { getSchedulesByClinic } from '@/services/admin/schedules'
import { showToast } from '@/helpers/toast'
import { useClinicSchedule } from '@/hooks/use-clinic-schedule'

interface RangeDatesAppointmentProps {
  date: DateRange | undefined
  clinic: string
  handleRangeSelect: SelectRangeEventHandler
}
export default function RangeDatesAppointment({
  date,
  clinic,
  handleRangeSelect,
}: RangeDatesAppointmentProps) {
  const { disabledDays } = useClinicSchedule(clinic)

  // Modificadores para deshabilitar días en el calendario
  const modifiers = {
    disabled: (day: Date) => disabledDays.indexOf(day.getDay()) === -1,
  }

  return (
    <div className='w-52 h-16 px-2 mb-4 md:mb-0'>
      <label htmlFor='clinic' className='block text-sm font-medium'>
        Clínica:
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'text-left font-normal w-full h-auto border-primary rounded-md focus:outline-none',
              !date && 'text-muted-foreground'
            )}
            // className={cn(
            //   'w-full pl-3 text-left font-normal',
            //   !field.value && 'text-muted-foreground'
            // )}
          >
            {date?.from && format(date.from, 'P', { locale: es })}
            {date?.to && ' | ' + format(date.to, 'P', { locale: es })}

            {!date?.from && !date?.to && <span>Elija una fecha</span>}
            <Icons.calendarDays className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='range'
            selected={date}
            onSelect={handleRangeSelect}
            modifiers={modifiers}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
