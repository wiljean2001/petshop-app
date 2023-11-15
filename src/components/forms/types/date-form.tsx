import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { DateFieldConfig } from '@/types'
import { Control, UseFormSetValue } from 'react-hook-form'
import es from 'date-fns/locale/es'
import { format, setHours, setMinutes } from 'date-fns'
import { Input } from '@/components/ui/input'

interface DateFormProps {
  fieldConfig: DateFieldConfig
  control: Control<any>
  setValue: UseFormSetValue<any>
}
export default function DateForm({
  fieldConfig,
  control,
  setValue,
}: DateFormProps) {
  return (
    <FormField
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPPp', { locale: es })
                  ) : (
                    <span>Elija una fecha</span>
                  )}
                  <Icons.calendarDays className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                // onSelect={field.onChange}
                // selected={field.value ? new Date(field.value) : null}
                onSelect={(date) => {
                  const updatedDate = setHours(
                    setMinutes(
                      new Date(date!),
                      new Date(field.value).getMinutes() || 0
                    ),
                    new Date(field.value).getHours() || 0
                  )
                  field.onChange(updatedDate)
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                lang='es'
                locale={es}
                footer={
                  fieldConfig.withTime && (
                    <Input
                      type='time'
                      className='mt-2'
                      value={
                        field.value
                          ? format(new Date(field.value), 'HH:mm', {
                              locale: es,
                            })
                          : ''
                      }
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value
                          .split(':')
                          .map(Number)
                        const updatedDate = setHours(
                          setMinutes(new Date(field.value), minutes),
                          hours
                        )
                        field.onChange(updatedDate)
                      }}
                    />
                  )
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {fieldConfig.description && (
            <FormDescription>{fieldConfig.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
