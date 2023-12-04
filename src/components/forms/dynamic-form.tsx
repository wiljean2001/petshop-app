import React, { memo, useCallback, useEffect, useState } from 'react'
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
import RadioForm from './types/radio-form'
import { showToast } from '@/helpers/toast'

function DynamicFormField<t extends FieldValues>({
  fieldConfig,
  control,
  setValue,
  fieldSetIndex,
}: {
  fieldConfig: FieldConfig
  nameCompuest?: string
  control: Control<any>
  setValue: UseFormSetValue<any>
  fieldSetIndex?: number
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

  if (fieldConfig.type === 'radio') {
    return (
      <RadioForm
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
  const { control, handleSubmit, setValue, unregister, watch } = form
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dynamicFieldConfig = formConfig.find((fc) => fc.type === 'dynamic') as
    | DynamicFieldConfig
    | undefined

  // Inicializa dynamicFieldSets como un array vacío
  const [dynamicFieldSets, setDynamicFieldSets] = useState(
    dynamicFieldConfig ? dynamicFieldConfig.options : []
  )

  const handleAddFieldSet = useCallback(() => {
    setDynamicFieldSets((prevSets) => [
      ...prevSets,
      {
        id: `dynamic-${Date.now()}`,
        config: dynamicFieldConfig?.options[0].config || [],
      },
    ])
  }, [dynamicFieldConfig])

  // const handleRemoveFieldSet = useCallback((setId: string) => {
  //   setDynamicFieldSets((prevSets) =>
  //     prevSets.filter((set) => set.id !== setId)
  //   )
  // }, [])
  const allFields = watch() // Observa todos los campos

  // Puedes usar un efecto para mostrar los cambios en la consola
  useEffect(() => {
    console.log(allFields)
  }, [allFields])

  const handleRemoveFieldSet = useCallback(
    (setId: string, fieldSetIndex: number) => {
      setDynamicFieldSets((prevSets) => {
        dynamicFieldSets
        // Encuentra el conjunto de campos a eliminar
        const setToRemove = prevSets.find((set) => set.id === setId)

        if (dynamicFieldConfig && setToRemove && setToRemove.config) {
          // Desregistra cada campo del conjunto
          try {
            setToRemove.config.forEach((fieldConfig) => {
              const fieldName = `${dynamicFieldConfig.name}[${fieldSetIndex}].${fieldConfig.name}`
              unregister(fieldName as any)
            })
          } catch (error) {
            showToast('Eliminación fallita de compos', 'warning')
          }
        }

        // Filtra el conjunto de campos del estado
        return prevSets.filter((set) => set.id !== setId)
      })
    },
    [dynamicFieldConfig, dynamicFieldSets, unregister]
  )

  const handleSubmitForm = useCallback(
    async (input: t) => {
      setIsSubmitting(true)
      try {
        await onSubmit(input)
      } catch (error) {
        console.error(error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmit]
  )

  useEffect(() => {
    if (dynamicFieldConfig && dynamicFieldConfig.options) {
      setDynamicFieldSets(dynamicFieldConfig.options)
    }
  }, [dynamicFieldConfig])

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className={cn('space-y-2 px-1', className)}
      >
        {formConfig.map((fieldConfig, index) => {
          if (fieldConfig.type === 'dynamic') {
            return (
              <div key={index + fieldConfig.type}>
                {dynamicFieldSets.map(({ id, config }, fieldSetIndex) => (
                  <div
                    key={id}
                    className='relative flex items-start flex-wrap gap-1 px-2 py-4 my-2'
                  >
                    {config &&
                      config.length > 0 &&
                      config.map((dynamicFieldConfig, dynamicFieldIndex) => {
                        const fieldName = `${fieldConfig.name}[${fieldSetIndex}].${dynamicFieldConfig.name}`
                        return (
                          <DynamicFormFieldMemo
                            key={dynamicFieldIndex + dynamicFieldConfig.name}
                            fieldConfig={{
                              ...dynamicFieldConfig,
                              name: fieldName,
                            }}
                            control={control}
                            setValue={setValue}
                            fieldSetIndex={fieldSetIndex}
                          />
                        )
                      })}
                    {config && config.length > 0 && fieldConfig.withButtons && (
                      <div className='absolute top-0 right-0 m-2'>
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          onClick={() =>
                            handleRemoveFieldSet(id, fieldSetIndex)
                          }
                        >
                          <Icons.trash className='w-3' />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {fieldConfig.withButtons && (
                  <div className='flex justify-end'>
                    <Button type='button' onClick={handleAddFieldSet}>
                      <Icons.add className='w-4' />
                    </Button>
                  </div>
                )}
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
              type={button.type}
            >
              {button.title}
            </Button>
          ))}
        </div>
      </form>
    </Form>
  )
}
