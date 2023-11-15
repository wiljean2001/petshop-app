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
import { SelectFieldConfig } from '@/types'
import { Control, UseFormSetValue } from 'react-hook-form'

interface SelectFormProps {
  fieldConfig: SelectFieldConfig
  control: Control<any>
  setValue: UseFormSetValue<any>
}
export default function SelectForm({
  fieldConfig,
  control,
  setValue,
}: SelectFormProps) {
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
                  // No multiple
                  // role='combobox'
                  // className={cn(
                  //   'w-[300px] justify-between',
                  //   !field.value && 'text-muted-foreground'
                  // )}
                  // Multiple
                  aria-multiselectable={
                    fieldConfig.isMultiple === true
                      ? fieldConfig.isMultiple
                      : undefined
                  }
                  className={cn(
                    'w-[300px] justify-between overflow-hidden',
                    !(field.value && field.value.length) &&
                      'text-muted-foreground'
                  )}
                >
                  {/* No multiple */}
                  {/* {field.value
                        ? fieldConfig.options.find(
                            (option: any) => option.value === field.value
                          )?.label
                        : 'Seleccionar'} */}
                  {/* Multiple */}
                  {field.value && field.value.length
                    ? fieldConfig.options
                        .filter((option) => field.value.includes(option.value))
                        .map((option) => option.label)
                        .join(', ')
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
                            'mr-2 h-4 w-4',
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
          {fieldConfig.description && (
            <FormDescription>{fieldConfig.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
