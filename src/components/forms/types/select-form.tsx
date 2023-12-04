import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { SelectFieldConfig } from '@/types'
import { Control, UseFormSetValue } from 'react-hook-form'
import Select from '../inputs/select'

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
  return (
    <FormField
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem className='flex flex-col w-full'>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormControl>
            <Select
              field={field}
              fieldConfig={fieldConfig}
              setValue={setValue}
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
