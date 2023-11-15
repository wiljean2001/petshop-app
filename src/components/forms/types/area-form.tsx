import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { TextareaFieldConfig } from '@/types'
import { Control, UseFormSetValue } from 'react-hook-form'

interface AreaFormProps {
  fieldConfig: TextareaFieldConfig
  control: Control<any>
  setValue: UseFormSetValue<any>
}
export default function AreaForm({
  fieldConfig,
  control,
  setValue,
}: AreaFormProps) {
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
