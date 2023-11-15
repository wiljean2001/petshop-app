import React, { memo, useState } from 'react'
import {
  UseFormReturn,
  FieldValues,
  Control,
  UseFormSetValue,
} from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Form } from '../ui/form'
import { Button } from '../ui/button'

import { ButtonConfig, DynamicFieldConfig, FieldConfig } from '@/types'

import { useMounted } from '@/hooks/use-mounted'
import InputForm from './types/input-form'
import AreaForm from './types/area-form'
import DateForm from './types/date-form'
import SelectForm from './types/select-form'

function DynamicFormField<t extends FieldValues>({
  fieldConfig,
  control,
  setValue,
}: {
  fieldConfig: FieldConfig
  nameCompuest?: string
  control: Control<any>
  setValue: UseFormSetValue<any>
}) {
  if (
    fieldConfig.type === 'text' ||
    fieldConfig.type === 'number' ||
    fieldConfig.type === 'email' ||
    fieldConfig.type === 'password' ||
    fieldConfig.type === 'time' ||
    fieldConfig.type === 'tel'
  ) {
    return (
      <InputForm
        control={control}
        fieldConfig={fieldConfig}
        setValue={setValue}
      />
    )
  }

  if (fieldConfig.type === 'area') {
    return (
      <AreaForm
        control={control}
        fieldConfig={fieldConfig}
        setValue={setValue}
      />
    )
  }

  if (fieldConfig.type === 'date') {
    return (
      <DateForm
        control={control}
        fieldConfig={fieldConfig}
        setValue={setValue}
      />
    )
  }

  if (fieldConfig.type === 'select') {
    return (
      <SelectForm
        control={control}
        fieldConfig={fieldConfig}
        setValue={setValue}
      />
    )
  }

  return null
}

const DynamicFormFieldMemo = memo(DynamicFormField)

export function DynamicForm<t extends FieldValues>({
  formConfig,
  form,
  onSubmit,
  buttons,
  className,
}: {
  formConfig: FieldConfig[]
  form: UseFormReturn<t>
  onSubmit: (input: t) => void
  buttons: ButtonConfig[]
  className?: string
}) {
  const mouted = useMounted()
  const { control, handleSubmit, setValue, unregister } = form
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dynamicFieldConfig = formConfig.find((fc) => fc.type === 'dynamic') as
    | DynamicFieldConfig
    | undefined

  const [dynamicFieldSets, setDynamicFieldSets] = useState(
    dynamicFieldConfig ? [dynamicFieldConfig.options] : []
  )

  const handleAddFieldSet = () => {
    if (dynamicFieldConfig) {
      setDynamicFieldSets([...dynamicFieldSets, dynamicFieldConfig.options])
    }
  }

  const handleRemoveFieldSet = (index: number) => {
    const newDynamicFieldSets = [...dynamicFieldSets]
    newDynamicFieldSets.splice(index, 1)
    setDynamicFieldSets(newDynamicFieldSets)
  }

  const handleSubmitForm = async (input: t) => {
    setIsSubmitting(true)
    try {
      await onSubmit(input)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  if (!mouted) return

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className={cn('space-y-2 px-1', className)}
      >
        {formConfig.map((fieldConfig, index) => {
          if (fieldConfig.type === 'dynamic') {
            return (
              <div key={index}>
                {dynamicFieldSets.map((fieldSet, fieldSetIndex) => {
                  return (
                    <div
                      key={fieldSetIndex}
                      className='flex justify-between px-2 py-4 shadow-sm' // Alineación y margen
                    >
                      {fieldSet.map((dynamicFieldConfig, dynamicFieldIndex) => {
                        // The name is dynamically built here
                        const fieldName = `${fieldConfig.name}[${fieldSetIndex}].${dynamicFieldConfig.name}`

                        return (
                          <div
                            className='flex flex-col mr-2'
                            key={dynamicFieldIndex}
                          >
                            <DynamicFormFieldMemo
                              fieldConfig={{
                                ...dynamicFieldConfig,
                                name: fieldName,
                              }}
                              control={control}
                              setValue={setValue}
                              // index={fieldSetIndex} // Se pasa el índice para construir el nombre dinámicamente
                            />
                          </div>
                        )
                      })}
                      <div className='flex justify-end'>
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          onClick={() => {
                            // Desregistra los campos antes de eliminar el conjunto de campos
                            try {
                              dynamicFieldSets[fieldSetIndex].forEach(
                                (field) => {
                                  const fieldName = `${fieldConfig.name}[${fieldSetIndex}].${field.name}`
                                  unregister(fieldName as any)
                                }
                              )
                              handleRemoveFieldSet(fieldSetIndex)
                            } catch (error) {
                              console.log(
                                '🚀 ~ file: dynamic-form.tsx:379 ~ {dynamicFieldSets.map ~ error:',
                                error
                              )
                            }
                          }}
                        >
                          <Icons.trash className='w-4' />
                        </Button>
                      </div>
                    </div>
                  )
                })}
                <div className='flex justify-end'>
                  <Button
                    type='button'
                    onClick={() => {
                      handleAddFieldSet()
                    }}
                  >
                    <Icons.add className='w-4' />
                  </Button>
                </div>
              </div>
            )
          }
          return (
            <DynamicFormFieldMemo
              key={index}
              fieldConfig={fieldConfig}
              control={control}
              setValue={setValue}
            />
          )
        })}
        <div
          className={cn(
            'flex gap-2',
            buttons.length > 1 ? 'justify-end' : 'justify-center'
          )}
        >
          {buttons.map((button, index) => (
            <Button
              key={index}
              className={button.className}
              onClick={button.onClick}
              disabled={isSubmitting}
            >
              {button.title}
            </Button>
          ))}
        </div>
      </form>
    </Form>
  )
}
