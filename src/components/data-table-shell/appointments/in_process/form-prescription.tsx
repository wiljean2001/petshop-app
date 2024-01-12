'use client'
import { useForm } from 'react-hook-form'
import {
  PrescriptionSchema,
  IAppointment,
  IPrescription,
  IService,
} from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo, useState } from 'react'
import { FieldConfig, optionsForDynamicField } from '@/types'
import { showToast } from '@/helpers/toast'
import { DynamicForm } from '@/components/forms/dynamic-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getServices } from '@/services/public/services'
import {
  DiagnosticStatusOptions,
  PrescriptionItemTypeOptions,
} from '@/config/const'

interface Props {
  onConfirm: (input: IPrescription) => Promise<boolean>
  prescription: IPrescription
}

export default function FormPrescription({ onConfirm, prescription }: Props) {
  const form = useForm<IPrescription>({
    resolver: valibotResolver(PrescriptionSchema),
    // defaultValues: {},
  })
  useEffect(() => {
    if (prescription) {
      const prescriptionItems = prescription.prescribedItem

      form.setValue('instructions', prescription.instructions)
      form.setValue(`id`, prescription.id)
      if (
        prescriptionItems &&
        Array.isArray(prescriptionItems) &&
        prescriptionItems.length > 0
      ) {
        prescriptionItems.map((item, index) => {
          form.setValue(`prescribedItem[${index}].id` as any, item.id)
          form.setValue(
            `prescribedItem[${index}].description` as any,
            item.description
          )
          form.setValue(`prescribedItem[${index}].type` as any, item.type)
          form.setValue(`prescribedItem[${index}].dosage` as any, item.dosage)
          form.setValue(
            `prescribedItem[${index}].instructions` as any,
            item.instructions
          )
          form.setValue(
            `prescribedItem[${index}].startDate` as any,
            item.startDate
          )
          form.setValue(`prescribedItem[${index}].endDate` as any, item.endDate)
        })
      }
    }
  }, [prescription, form])

  const inputs = useMemo((): FieldConfig[] => {
    const prescribedItemConfig: optionsForDynamicField = {
      id: `dynamic-${Date.now()}-prescription`,
      config: [
        {
          type: 'area',
          name: 'description',
          label: 'Descripción detallada:',
          placeholder: '',
        },
        {
          type: 'select',
          name: 'type',
          isMultiple: false,
          label: 'Tipo de indicación:',
          options: PrescriptionItemTypeOptions,
        },
        {
          type: 'text',
          name: 'dosage',
          label: 'Dósis:',
          placeholder: '',
        },
        {
          type: 'text',
          name: 'instructions',
          label: 'Instrucciones detalladas:',
          placeholder: '',
        },
        {
          type: 'date',
          name: 'startDate',
          label: 'Fecha para inciar:',
          modifiers: {
            disabled: (day: Date) => false,
          },
          withTime: true,
        },
        {
          type: 'date',
          name: 'endDate',
          label: 'Fecha para culminar:',
          modifiers: {
            disabled: (day: Date) => false,
          },
          withTime: true,
        },
      ],
    }

    // Crear opciones dinámicas basadas en la longitud de Prescription
    const dynamicOptions =
      prescription && prescription.prescribedItem.length > 0
        ? Array.from(
            {
              length: prescription.prescribedItem.length,
            },
            () => ({
              ...prescribedItemConfig,
              id: `dynamic-${Date.now()}-123`,
            })
          )
        : [prescribedItemConfig]

    return [
      {
        type: 'area',
        name: 'instructions',
        label: 'Instrucciones',
        placeholder: '',
        isAutoFocus: true,
      },
      {
        type: 'dynamic',
        name: 'prescribedItem',
        withButtons: true,
        options: dynamicOptions,
      },
    ]
  }, [prescription])

  const onHandle = async (input: IPrescription) => {
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
