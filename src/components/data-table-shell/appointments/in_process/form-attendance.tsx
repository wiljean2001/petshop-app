'use client'
import { useForm } from 'react-hook-form'
import {
  ServiceAppointmentArraySchema,
  IAppointment,
  IServiceAppointmentArray,
  IService,
} from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo } from 'react'
import { FieldConfig, optionsForDynamicField } from '@/types'
import { showToast } from '@/helpers/toast'
import { DynamicForm } from '@/components/forms/dynamic-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  onConfirm: (input: IServiceAppointmentArray) => Promise<boolean>
  totalServices: number
  appointment: IAppointment
  services: IService[]
}

export default function FormAttendances({
  onConfirm,
  totalServices,
  appointment,
  services,
}: Props) {
  console.log('🚀 ~ file: form-attendance.tsx:22 ~ appointment:', appointment)
  const form = useForm<IServiceAppointmentArray>({
    resolver: valibotResolver(ServiceAppointmentArraySchema),
    // defaultValues: {},
  })

  useEffect(() => {
    if (appointment) {
      Array(totalServices)
        .fill(0)
        .forEach((_, index) => {
          const serviceAppointment = appointment.ServiceAppointments[index]
          const service = `${
            services?.find(
              (s) => s.id === appointment.ServiceAppointments[index].serviceId
            )?.name || ''
          }`
          form.setValue(`services[${index}].serviceId` as any, service)
          form.setValue(
            `services[${index}].cost` as any,
            serviceAppointment.cost
          )
          form.setValue(
            `services[${index}].details` as any,
            serviceAppointment.details
          )
          form.setValue(`services[${index}].id` as any, serviceAppointment.id)
          if (serviceAppointment.clinicalData) {
            const clinicalData = serviceAppointment.clinicalData
            console.log(
              '🚀 ~ file: form-attendance.tsx:59 ~ .forEach ~ clinicalData:',
              clinicalData
            )

            form.setValue(
              `services[${index}].clinicalData.id` as any,
              clinicalData.id
            )
            form.setValue(
              `services[${index}].clinicalData.weight` as any,
              clinicalData.weight
            )
            form.setValue(
              `services[${index}].clinicalData.height` as any,
              clinicalData.height
            )
            form.setValue(
              `services[${index}].clinicalData.temperature` as any,
              clinicalData.temperature
            )
            form.setValue(
              `services[${index}].clinicalData.vitalSigns` as any,
              clinicalData.vitalSigns
            )
            form.setValue(
              `services[${index}].clinicalData.extras` as any,
              clinicalData.extras
            )
          }
        })
    }
  }, [appointment, form, services, totalServices])

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'dynamic',
        name: 'services',
        withButtons: false,
        options: Array(totalServices)
          .fill(0)
          .map(
            (_, index): optionsForDynamicField => ({
              id: `dynamic-${Date.now()}-${index}`,
              config: [
                {
                  type: 'text',
                  name: 'serviceId',
                  label: 'Servicio:',
                  placeholder: '',
                  isDisabled: true,
                },
                {
                  type: 'number',
                  name: 'cost',
                  label: 'Costo: (S/)',
                  placeholder: 'Precio estimado',
                  max: '10000',
                  min: '0',
                  step: '0.1',
                },
                {
                  type: 'area',
                  name: 'details',
                  label: 'Detalles:',
                  placeholder: 'Ingresar detalles.',
                },
                // when requiresClinicalData is checked then all next inputs is viewers
                ...(services?.find(
                  (s) =>
                    s.id === appointment.ServiceAppointments[index].serviceId
                )?.requiresClinicalData
                  ? [
                      {
                        type: 'number',
                        name: 'clinicalData.weight',
                        min: 0,
                        max: 10000,
                        step: '0.1',
                        label: 'Ancho: (cm.)',
                        placeholder: '',
                      },
                      {
                        type: 'number',
                        name: 'clinicalData.height',
                        min: 0,
                        max: 10000,
                        step: '0.1',
                        label: 'Alto: (cm.)',
                        placeholder: '',
                      },
                      {
                        type: 'number',
                        name: 'clinicalData.temperature',
                        min: 0,
                        max: 10000,
                        step: '0.1',
                        label: 'Temperatura: (C°)',
                        placeholder: '',
                      },
                      {
                        type: 'area',
                        name: 'clinicalData.vitalSigns',
                        label: 'Signos vitales:',
                        placeholder: '',
                      },
                      {
                        type: 'area',
                        name: 'clinicalData.extras',
                        label: 'Otros detalles: (opt.)',
                        placeholder: '',
                      },
                    ]
                  : ([] as any)),
              ],
            })
          ),
      },
    ]
  }, [appointment, services, totalServices])

  const onHandle = async (input: IServiceAppointmentArray) => {
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
