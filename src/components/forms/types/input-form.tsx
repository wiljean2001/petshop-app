import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NumberFieldConfig, TextFieldConfig } from '@/types'
import { Control, UseFormSetValue } from 'react-hook-form'

interface InputFormProps {
  fieldConfig: TextFieldConfig | NumberFieldConfig
  control: Control<any>
  setValue: UseFormSetValue<any>
}

export default function InputForm({
  fieldConfig,
  control,
  setValue,
}: InputFormProps) {
  const parseValue = (value: string) => {
    if (value.length == 0) {
      return value
    }
    if (fieldConfig.type === 'number') {
      return parseFloat(value) // Use parseFloat to convert to a floating-point number
    }
    return value
  }
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
              placeholder={
                fieldConfig.placeholder ? fieldConfig!.placeholder : undefined
              }
              min={fieldConfig.type === 'number' ? fieldConfig.min : undefined}
              max={fieldConfig.type === 'number' ? fieldConfig.max : undefined}
              step={
                fieldConfig.type === 'number' ? fieldConfig.step : undefined
              }
              autoSave={fieldConfig.name + '_' + fieldConfig.type}
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
