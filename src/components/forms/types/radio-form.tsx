import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioFieldConfig } from '@/types'
import { Control, UseFormSetValue } from 'react-hook-form'

interface RadioFormProps {
  fieldConfig: RadioFieldConfig
  control: Control<any>
  setValue: UseFormSetValue<any>
}
export default function RadioForm({
  fieldConfig,
  control,
  setValue,
}: RadioFormProps) {
  return (
    <FormField
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md p-4'>
          <FormControl>
            <Checkbox
              checked={field.value || false}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel>{fieldConfig.label}</FormLabel>
            {fieldConfig.description && (
              <FormDescription>{fieldConfig.description}</FormDescription>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
