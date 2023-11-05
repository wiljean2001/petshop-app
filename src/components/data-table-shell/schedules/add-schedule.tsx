import { useForm } from 'react-hook-form'
import { ScheduleSchema, ISchedule } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { createSchedule } from '@/services/admin/schedules'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddSchedule = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const form = useForm<ISchedule>({
    resolver: valibotResolver(ScheduleSchema),
    // defaultValues: {},
  })

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'day_week',
        // autoComplete: 'name_schedule',
        label: 'Días:',
        placeholder: 'Días',
        // className: 'mb-1 col-span-3',
      },
      {
        type: 'time',
        name: 'openingHour',
        placeholder: 'Abre',
        label: 'Abierto:',
        description: '',
        // withTime: true,

        // autoComplete: 'phone_number',
        // className: 'mb-1 col-span-1',
      },
      {
        type: 'time',
        name: 'closingHour',
        label: 'Cerrado:',
        description: '',
        placeholder: 'Cierra',
        // autoComplete: 'phone_number',
        // className: 'mb-1 col-span-1',
      },
    ]
  }, [])

  const onHandle = async (input: ISchedule) => {
    try {
      const res = await createSchedule({ input })
      console.log('🚀 ~ file: add-schedule.tsx:58 ~ onHandle ~ res:', res)
      if (res) {
        route.refresh()
        form.reset()
        onClose()
      }
    } catch (error) {
      console.log('🚀 ~ add Schedule ~ onHandle ~ error:', error)
    }
  }

  return (
    <>
      <WithFormDialog
        title='Registar horario:'
        form={{ inputs, form }}
        isOpen={isOpen}
        onClose={() => onClose()}
        onConfirm={onHandle}
      />
    </>
  )
}
