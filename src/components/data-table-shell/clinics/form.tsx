import { useForm } from 'react-hook-form'
import { ClinicSchema, IClinic, ISchedule } from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { createClinic } from '@/services/admin/clinics'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { showToast } from '@/helpers/toast'
import { FieldConfig } from '@/types'
import { useMounted } from '@/hooks/use-mounted'
import { getSchedules } from '@/services/public/schedules'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IClinic) => Promise<boolean>
  title: string
  initialValues?: Partial<IClinic>
}
export const FormClinic = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]) // Asumiendo que ISpecies es tu tipo para especies
  const mouted = useMounted()
  const form = useForm<IClinic>({
    resolver: valibotResolver(ClinicSchema),
    defaultValues: {
      image: '',
    },
  })
  useEffect(() => {
    if (initialValues && form) {
      try {
        // Extraer y asignar scheduleIds
        const scheduleIds =
          initialValues.ClinicSchedule?.map((cs) => cs.schedule.id!) || []
        form.setValue('scheduleIds', scheduleIds)

        // Establecer otros valores iniciales
        Object.keys(initialValues).forEach((key) => {
          if (key !== 'ClinicSchedule') {
            form.setValue(
              key as keyof IClinic,
              initialValues[key as keyof IClinic]
            )
          }
        })
      } catch (error) {
        showToast(
          'Horarios imposibles de insertar. Vuelve a intentarlo.',
          'warning'
        )
      }
    }
    const loadSchedules = async () => {
      try {
        const res = await getSchedules() // Asume que getSchedule es una función que obtiene las eSchedule
        setSchedules(res)
      } catch (error) {
        console.error('Error al cargar los horarios', error)
      }
    }

    if (isOpen) {
      loadSchedules()
    }
  }, [form, initialValues, isOpen])

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre del local:',
        placeholder: 'Nombre del local',
      },
      {
        type: 'tel',
        name: 'phone',
        label: 'Teléfono:',
        placeholder: 'Teléfono',
      },
      {
        type: 'text',
        name: 'location',
        label: 'Ubicación:',
        placeholder: 'Ubicación',
      },
      {
        type: 'select',
        name: 'scheduleIds',
        label: 'Horarios',
        isMultiple: true,
        options: schedules.map((s) => ({
          value: s.id!,
          label: s.dayWeek + ' | ' + s.openingHour + ' - ' + s.closingHour,
        })),
      },
      // {
      //   type: 'text',
      //   name: 'image',
      //   label: '',
      //   placeholder: 'image_clinic',
      // },
    ]
  }, [schedules])

  const onHandle = async (input: IClinic) => {
    try {
      if (!(await onConfirm(input))) return
      form.reset()
      onClose()
    } catch (error) {
      showToast(
        'Error: No se pudo realizar la acción. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
  }

  if (!mouted) return

  return (
    <WithFormDialog
      title={title}
      form={{ inputs, form }}
      isOpen={isOpen}
      onClose={() => {
        form.reset()
        onClose()
      }}
      onConfirm={onHandle}
    />
  )
}
