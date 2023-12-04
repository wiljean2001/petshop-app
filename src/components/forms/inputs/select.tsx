import { Icons } from '@/components/icons'
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
import { cn } from '@/lib/utils'
import { SelectFieldConfig } from '@/types'
import { ControllerRenderProps, UseFormSetValue } from 'react-hook-form'

interface SelectProps {
  fieldConfig: SelectFieldConfig
  field: ControllerRenderProps<any, string>
  setValue: UseFormSetValue<any>
}
/**
 * fieldConfig
 * {
 * label: is not using
 * }
 */
export default function Select({ fieldConfig, setValue, field }: SelectProps) {
  function toggleValue(values: any, value: any) {
    if (!values) {
      return [value]
    }
    const currentIndex = values.indexOf(value)
    const newValues = [...values]

    if (currentIndex === -1) {
      newValues.push(value)
    } else {
      newValues.splice(currentIndex, 1)
    }

    return newValues
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          aria-multiselectable={
            fieldConfig.isMultiple === true ? fieldConfig.isMultiple : undefined
          }
          className={cn(
            'w-full justify-between overflow-hidden h-auto',
            !(field.value && field.value.length) && 'text-muted-foreground'
          )}
          autoFocus={fieldConfig.isAutoFocus ?? undefined}
        >
          {/* Multiple and no multiple */}
          {field.value && field.value.length
            ? fieldConfig.options
                .filter((option) => field.value.includes(option.value))
                .map((option) => option.label)
                .join(', ')
            : 'Seleccionar'}
          <Icons.sortAscIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Buscar...' className='px-2' />
          <CommandEmpty>No encontrado.</CommandEmpty>
          <CommandGroup>
            {fieldConfig.options.map((option: any) => {
              return (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  // No multiple
                  // onSelect={() => {
                  //   setValue(fieldConfig.name, option.value)
                  // }}
                  // Multiple
                  onSelect={() => {
                    const newValues = fieldConfig.isMultiple
                      ? toggleValue(field.value, option.value)
                      : option.value
                    setValue(fieldConfig.name, newValues)
                  }}
                >
                  {/* <Icons.checkIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              option.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          /> */}
                  <Icons.checkIcon
                    className={cn(
                      'mr-1 h-4 w-4',
                      field.value && field.value.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
