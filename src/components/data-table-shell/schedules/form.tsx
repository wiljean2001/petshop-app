import { useForm } from 'react-hook-form'
import { ScheduleSchema, ISchedule } from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { createSchedule } from '@/services/admin/schedules'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: ISchedule) => Promise<boolean>
  title: string
  initialValues?: Partial<ISchedule>
}
export const FormSchedule = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
  const form = useForm<ISchedule>({
    resolver: valibotResolver(ScheduleSchema),
    // defaultValues: {},
  })

  useEffect(() => {
    if (initialValues && form) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(
          key as keyof ISchedule,
          initialValues[key as keyof ISchedule]
        )
      })
    }
  }, [form, initialValues])

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'dayWeek',
        label: 'Días:',
        placeholder: 'Días',
      },
      {
        type: 'time',
        name: 'openingHour',
        placeholder: 'Abre',
        label: 'Abierto:',
        description: '',
      },
      {
        type: 'time',
        name: 'closingHour',
        label: 'Cerrado:',
        description: '',
        placeholder: 'Cierra',
      },
    ]
  }, [])

  const onHandle = async (input: ISchedule) => {
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

  return (
    <>
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
    </>
  )
}
