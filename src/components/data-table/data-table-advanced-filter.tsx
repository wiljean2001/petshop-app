'use client'

import * as React from 'react'
import type {
  DataTableFilterableColumn,
  DataTableFilterOption,
  DataTableSearchableColumn,
} from '@/types'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Icons } from '../icons'

interface DataTableAdvancedFilterProps<TData> {
  filterableColumns?: DataTableFilterableColumn<TData>[]
  searchableColumns?: DataTableSearchableColumn<TData>[]
  selectedOptions: DataTableFilterOption<TData>[]
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<DataTableFilterOption<TData>[]>
  >
  removeSelected?: boolean
  children?: React.ReactNode
}

export function DataTableAdvancedFilter<TData>({
  filterableColumns = [],
  searchableColumns = [],
  selectedOptions,
  setSelectedOptions,
  removeSelected = false,
  children,
}: DataTableAdvancedFilterProps<TData>) {
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const options: DataTableFilterOption<TData>[] = React.useMemo(() => {
    const searchableOptions = searchableColumns.map((column) => ({
      label: String(column.id),
      value: column.id,
      items: [],
    }))
    const filterableOptions = filterableColumns.map((column) => ({
      label: column.title,
      value: column.id,
      items: column.options,
    }))
    let allOptions = [...searchableOptions, ...filterableOptions]
    if (removeSelected) {
      allOptions = allOptions.filter((option) => {
        return !selectedOptions.find((item) => item.value === option.value)
      })
    }
    return allOptions
  }, [searchableColumns, filterableColumns, selectedOptions, removeSelected])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children ?? (
          <Button variant='outline' size='sm' role='combobox'>
            Filter
            <Icons.arrowUpDown
              className='ml-2 h-4 w-4 shrink-0 opacity-50'
              aria-hidden='true'
            />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='end'>
        <Command>
          <CommandInput placeholder='Filtrar por...' />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={String(option.value)}
                className='capitalize'
                value={String(option.value)}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                  setSelectedOptions((prev) => {
                    if (currentValue === value) {
                      return prev.filter((item) => item.value !== option.value)
                    } else {
                      return [...prev, option]
                    }
                  })
                }}
              >
                {option.items.length > 0 ? (
                  <Icons.chevronDownIcon
                    className='mr-2 h-4 w-4'
                    aria-hidden='true'
                  />
                ) : (
                  <Icons.textIcon className='mr-2 h-4 w-4' aria-hidden='true' />
                )}
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false)
                setSelectedOptions([
                  ...selectedOptions,
                  {
                    label: 'Advanced',
                    value: 'advanced',
                    items: [],
                    isAdvanced: true,
                  },
                ])
              }}
            >
              <Icons.plusIcon className='mr-2 h-4 w-4' aria-hidden='true' />
              Filtro avanzado
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
