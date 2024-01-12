'use client'
import { useForm } from 'react-hook-form'
import {
  DiagnosticSchema,
  IAppointment,
  IDiagnostic,
  IService,
} from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo, useState } from 'react'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'
import { DynamicForm } from '@/components/forms/dynamic-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DiagnosticStatusOptions } from '@/config/const'

interface Props {
  onConfirm: (input: any) => Promise<boolean>
  appointment: IAppointment
}

export default function FormDiagnostic({ onConfirm, appointment }: Props) {
  const form = useForm<IDiagnostic>({
    resolver: valibotResolver(DiagnosticSchema),
    // defaultValues: {},
  })

  useEffect(() => {
    if (appointment.Attendances && appointment.Attendances.Diagnostics) {
      const diagnostic = appointment.Attendances.Diagnostics

      form.setValue('description', diagnostic.description)
      form.setValue('status', diagnostic.status)
      form.setValue('id', diagnostic.id)
    }
  }, [appointment, form])

  const inputs = useMemo(
    (): FieldConfig[] => [
      {
        type: 'area',
        label: 'Descripción',
        name: 'description',
        placeholder: '',
        isAutoFocus: true,
      },
      {
        type: 'select',
        name: 'status',
        label: 'Estado de la mascota',
        options: DiagnosticStatusOptions,
        isMultiple: false,
      },
    ],
    []
  )

  const onHandle = async (input: IDiagnostic) => {
    try {
      if (!(await onConfirm(input))) return
      form.reset()
    } catch (error) {
      showToast(
        'Error: No se pudo realizar la acción. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
  }

  return (
    <>
      <DynamicForm
        onSubmit={onHandle}
        formConfig={inputs}
        form={form}
        buttons={[
          {
            title: 'Guardar',
            type: 'submit',
            className: `${cn(
              // 'col-start-4 col-span-1',
              buttonVariants({ variant: 'destructive' })
            )}`,
          },
        ]}
      />
    </>
  )
}
