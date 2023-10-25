import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import type {
  Control,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form'

import { cn } from '@/lib/utils'
import { showToast } from '@/helpers/toast'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Option } from '@/types'

interface Props {
  control: Control<any>
  name: string
  placeHolder: string
  className?: string
  label?: string
  items: Option[]
}
export const CustomSelect = ({
  control,
  name,
  placeHolder,
  className,
  label,
  items,
}: Props) => {
  const getTitle = (field: string[] | string) => {
    if (Array.isArray(field) && field.length > 0) {
      const result = field.map((value) => {
        const foundItem = items.find((item) => item.value === value)
        return foundItem ? foundItem.label : null
      })
      return result.map((value, index) => <Badge key={index}>{value}</Badge>)
    }
    if (typeof field == 'string') {
      return <Badge>{field}</Badge>
    }
  }

  const onSelect = (
    value: string,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    let selectedValues: string[] | string

    if (Array.isArray(field.value)) {
      selectedValues = [...field.value]

      if (!selectedValues.includes(value)) {
        selectedValues.push(value)
      } else {
        const index = selectedValues.indexOf(value)
        if (index > -1) {
          selectedValues.splice(index, 1)
        }
      }
    }
    if (typeof field.value == 'string') {
      selectedValues = field.value
    }
    try {
      field.onChange(selectedValues!)
    } catch (error) {
      showToast('Error al seleccionar categoría', 'error')
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log('🚀 ~ file: custom-select.tsx:96 ~ field:', field)
        // if (!field.value) return <></>
        return (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn(
                      'ml-2 w-[250px] justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {placeHolder}
                    {/* {field.value.length > 1
                      ? items.find((item) => item.value === field.value)?.label
                      : placeHolder} */}
                    <Icons.arrowUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-[250px] p-0'>
                <Command>
                  <CommandInput placeholder={placeHolder} />
                  <CommandEmpty>Sin resultados</CommandEmpty>
                  <CommandGroup className='text-center'>
                    {getTitle(field.value)}
                  </CommandGroup>
                  {items && (
                    <CommandGroup>
                      {items.map((item, index) => (
                        <CommandItem
                          {...field}
                          value={item.value}
                          key={index}
                          onSelect={(value) => onSelect(value, field)}
                        >
                          <Icons.check
                            key={index}
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value && field.value.includes(item.value)
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
            {/* <FormDescription>
              Este es tu correo electrónico.
            </FormDescription> */}
          </FormItem>
        )
      }}
    />
  )
}
