import { useForm } from 'react-hook-form'
import {
  AppointmentOnlyUpdateSchema,
  IAppointmentOnlyUpdate,
} from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo, useState } from 'react'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'
import { AppointmentStatusKey, AppointmentStatusOptions } from '@/config/const'
import { getPets } from '@/services/admin/pets'
import { useClinicSchedule } from '@/hooks/use-clinic-schedule'
import { WithFormDialog } from '../config'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IAppointmentOnlyUpdate) => Promise<boolean>
  title: string
  initialValues: {
    clinic?: string
    appointmentStatus?: AppointmentStatusKey
    scheduledDateTime?: Date
  }
}

export default function FormUpdateAppointment({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) {
  const form = useForm<IAppointmentOnlyUpdate>({
    resolver: valibotResolver(AppointmentOnlyUpdateSchema),
    // defaultValues: {},
  })

  const { disabledDays, enabledHours } = useClinicSchedule(initialValues.clinic)

  useEffect(() => {
    if (
      isOpen &&
      initialValues.appointmentStatus &&
      typeof initialValues.scheduledDateTime === 'string'
    ) {
      try {
        form.setValue(
          'scheduledDateTime',
          new Date(initialValues.scheduledDateTime)
        )
        form.setValue('status', initialValues.appointmentStatus)
      } catch (error) {
        showToast('Ocurrió un fallo en iniciar los valores.', 'warning')
      }
    }
  }, [initialValues, form, isOpen])

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'date',
        name: 'scheduledDateTime',
        label: 'Fecha y hora:',
        withTime: true,
        modifiers: {
          disabled: (day: Date) => {
            // Crear una fecha para "hoy" que solo tenga año, mes y día (sin tiempo)
            const today = new Date()
            
            today.setHours(0, 0, 0, 0)

            // Comprueba si 'day' está en disabledDays
            const isDayInDisabledDays =
              disabledDays.indexOf(day.getDay()) !== -1

            // Si 'day' está en disabledDays, entonces verifica si 'day' es menor o igual a 'today'
            if (isDayInDisabledDays) {
              return day < today
            }

            // Si 'day' no está en disabledDays, entonces no aplica la restricción
            return true
          },
        },
        modifiersTimes: {
          minTime: enabledHours.minTime ? enabledHours.minTime : '00:00',
          maxTime: enabledHours.maxTime ? enabledHours.maxTime : '00:00',
        },
      },
      {
        type: 'select',
        name: 'status',
        label: 'Estado:',
        isMultiple: false,
        /**
         * @options {array} - Array of appointments with only the first appointment
         */
        options: AppointmentStatusOptions.filter((key) => {
          return ['PENDING', 'CONFIRMED'].includes(key.value)
        }),
      },
    ]
  }, [disabledDays, enabledHours])

  const onHandle = async (input: IAppointmentOnlyUpdate) => {
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
      <WithFormDialog
        title={title}
        form={{ inputs, form }}
        isOpen={isOpen}
        onClose={() => onClose()}
        onConfirm={onHandle}
      />
    </>
  )
}
