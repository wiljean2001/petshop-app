import React, { useState } from 'react'
import {
  UseFormReturn,
  FieldValues,
  Control,
  UseFormSetValue,
} from 'react-hook-form'
import { format, setHours, setMinutes } from 'date-fns'
import es from 'date-fns/locale/es'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command'
import { Calendar } from '../ui/calendar'
import { ButtonConfig, DynamicFieldConfig, FieldConfig } from '@/types'
import { useSearchParams } from 'next/navigation'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import { useMounted } from '@/hooks/use-mounted'

function DynamicFormField<t extends FieldValues>({
  fieldConfig,
  control,
  setValue,
}: {
  fieldConfig: FieldConfig
  nameCompuest?: string
  control: Control<any>
  setValue: UseFormSetValue<any>
}) {
  const parseValue = (value: string) => {
    if (value.length == 0) {
      return value
    }
    if (fieldConfig.type === 'number') {
      return parseFloat(value) // Use parseFloat to convert to a floating-point number
    }
    return value
  }

  if (
    fieldConfig.type === 'text' ||
    fieldConfig.type === 'number' ||
    fieldConfig.type === 'email' ||
    fieldConfig.type === 'password' ||
    fieldConfig.type === 'time' ||
    fieldConfig.type === 'tel'
  ) {
    return (
      <FormField
        control={control}
        name={fieldConfig.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldConfig.label}</FormLabel>
            <FormControl>
              <Input
                type={fieldConfig.type}
                placeholder={fieldConfig.placeholder}
                min={
                  fieldConfig.type === 'number' ? fieldConfig.min : undefined
                }
                max={
                  fieldConfig.type === 'number' ? fieldConfig.max : undefined
                }
                step={
                  fieldConfig.type === 'number' ? fieldConfig.step : undefined
                }
                {...field}
                onChange={(e) => field.onChange(parseValue(e.target.value))}
              />
            </FormControl>
            {fieldConfig.description && (
              <FormDescription>{fieldConfig.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  if (fieldConfig.type === 'area') {
    return (
      <FormField
        control={control}
        name={fieldConfig.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldConfig.label}</FormLabel>
            <FormControl>
              <Textarea placeholder={fieldConfig.placeholder} {...field} />
            </FormControl>
            {fieldConfig.description && (
              <FormDescription>{fieldConfig.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  if (fieldConfig.type === 'date') {
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

  if (fieldConfig.type === 'select') {
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
                    variant='outline'
                    role='combobox'
                    className={cn(
                      'w-[300px] justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? fieldConfig.options.find(
                          (option: any) => option.value === field.value
                        )?.label
                      : 'Seleccionar'}
                    <Icons.sortAscIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-[300px] p-0'>
                <Command>
                  <CommandInput placeholder='Buscar...' className='px-2' />
                  <CommandEmpty>No encontrado.</CommandEmpty>
                  <CommandGroup>
                    {fieldConfig.options.map((option: any) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          setValue(fieldConfig.name, option.value)
                        }}
                      >
                        <Icons.checkIcon
                          className={cn(
                            'mr-2 h-4 w-4',
                            option.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
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

  return null
}

export function DynamicForm<t extends FieldValues>({
  formConfig,
  form,
  onSubmit,
  buttons,
  className,
}: {
  formConfig: FieldConfig[]
  form: UseFormReturn<t>
  onSubmit: (input: t) => void
  buttons: ButtonConfig[]
  className?: string
}) {
  const mouted = useMounted()
  const { control, handleSubmit, setValue } = form
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dynamicFieldConfig = formConfig.find((fc) => fc.type === 'dynamic') as
    | DynamicFieldConfig
    | undefined

  const [dynamicFieldSets, setDynamicFieldSets] = useState(
    dynamicFieldConfig ? [dynamicFieldConfig.options] : []
  )

  const handleAddFieldSet = () => {
    if (dynamicFieldConfig) {
      setDynamicFieldSets([...dynamicFieldSets, dynamicFieldConfig.options])
    }
  }

  const handleRemoveFieldSet = (index: number) => {
    const newDynamicFieldSets = [...dynamicFieldSets]
    newDynamicFieldSets.splice(index, 1)
    setDynamicFieldSets(newDynamicFieldSets)
  }

  const handleSubmitForm = async (input: t) => {
    setIsSubmitting(true)
    try {
      await onSubmit(input)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  if (!mouted) return

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className={cn('space-y-2 px-1', className)}
      >
        {formConfig.map((fieldConfig, index) => {
          if (fieldConfig.type === 'dynamic') {
            return (
              <>
                {dynamicFieldSets.map((fieldSet, fieldSetIndex) => {
                  return (
                    <div
                      key={fieldSetIndex}
                      className='flex justify-between px-2 py-4 shadow-sm' // Alineación y margen
                    >
                      {fieldSet.map((dynamicFieldConfig, dynamicFieldIndex) => {
                        // The name is dynamically built here
                        const fieldName = `${fieldConfig.name}[${fieldSetIndex}].${dynamicFieldConfig.name}`

                        return (
                          <div
                            className='flex flex-col mr-2'
                            key={dynamicFieldIndex}
                          >
                            <DynamicFormField
                              fieldConfig={{
                                ...dynamicFieldConfig,
                                name: fieldName,
                              }}
                              control={control}
                              setValue={setValue}
                              // index={fieldSetIndex} // Se pasa el índice para construir el nombre dinámicamente
                            />
                          </div>
                        )
                      })}
                      <div className='flex justify-end'>
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          onClick={() => handleRemoveFieldSet(fieldSetIndex)}
                        >
                          <Icons.trash className='w-4' />
                        </Button>
                      </div>
                    </div>
                  )
                })}
                <div className='flex justify-end'>
                  <Button type='button' onClick={handleAddFieldSet}>
                    <Icons.add className='w-4' />
                  </Button>
                </div>
              </>
            )
          }
          return (
            <DynamicFormField
              key={index}
              fieldConfig={fieldConfig}
              control={control}
              setValue={setValue}
            />
          )
        })}
        <div
          className={cn(
            'flex gap-2',
            buttons.length > 1 ? 'justify-end' : 'justify-center'
          )}
        >
          {buttons.map((button, index) => (
            <Button
              key={index}
              className={button.className}
              onClick={button.onClick}
              disabled={isSubmitting}
            >
              {button.title}
            </Button>
          ))}
        </div>
      </form>
    </Form>
  )
}
