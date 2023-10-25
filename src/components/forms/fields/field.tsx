import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { HTMLInputTypeAttribute } from 'react'
import type { Control } from 'react-hook-form'

export const FieldCustom = ({
  control,
  name,
  placeHolder,
  autoComplete,
  type,
  className,
  label,
}: {
  /**
   * eslint-disable-next-line @typescript-eslint/no-explicit-any
   */
  control: Control<any>
  name: string
  autoComplete: string
  placeHolder: string
  type: HTMLInputTypeAttribute
  className?: string
  label?: string
}) => {
  const parseValue = (value: string) => {
    if (value.length == 0) {
      return value
    }
    if (type === 'number') {
      return parseFloat(value) // Use parseFloat to convert to a floating-point number
    }
    return value
  }

  return (
    <FormField
      control={control}
      name={name}
      render={(field) => {
        return (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                placeholder={placeHolder}
                type={type}
                // type={type}
                autoComplete={autoComplete}
                {...field.field}
                onChange={(e) =>
                  field.field.onChange(parseValue(e.target.value))
                }
              />
            </FormControl>
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
