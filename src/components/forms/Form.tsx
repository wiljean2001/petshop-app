import { Form } from '@/components/ui/form'
import { FieldCustom } from '@/components/forms/fields/field'
import { Button, type ButtonProps } from '@/components/ui/button'
import type { UseFormReturn } from 'react-hook-form'
import { CustomSelect } from '@/components/forms/select/custom-select'
import { type HTMLInputTypeAttribute, memo } from 'react'
import { ButtonConfig, Option } from '@/types'

export type CustomOptionInput = {
  name: string
  type: HTMLInputTypeAttribute
  placeHolder: string
  autoComplete: string
  className?: string
  label?: string
} & {
  items?: Option[] // if use items so is a select component field
}

interface CustomFormProps {
  inputsForm: CustomOptionInput[]
  form: UseFormReturn<any>
  handleSubmit: (value: any) => void
  buttons: ButtonConfig[]
}

const CustomForm = ({
  inputsForm,
  form,
  handleSubmit,
  buttons,
}: CustomFormProps) => {
  const renderInputField = (input: CustomOptionInput, index: number) => {
    
    return input.items && input.items.length > 0 ? (
      <CustomSelect
        key={index}
        control={form.control}
        items={input.items}
        name={input.name}
        placeHolder={input.placeHolder}
        className={input.className}
        label={input.label}
      />
    ) : (
      <FieldCustom
        key={index}
        control={form.control}
        name={input.name}
        placeHolder={input.placeHolder}
        autoComplete={input.autoComplete}
        type={input.type}
        className={input.className}
        label={input.label}
      />
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='grid gap-4 px-4'>
          <div className='grid grid-cols-4 gap-1'>
            {inputsForm.map(renderInputField)}
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {buttons.map((button, index) => (
              <Button
                key={index}
                className={button.className}
                onClick={button.onClick}
              >
                {button.title}
              </Button>
            ))}
          </div>
        </div>
      </form>
    </Form>
  )
}
export default memo(CustomForm)
