import { useForm } from 'react-hook-form'
import { ClinicScheduleSchema, IClinicSchedule } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { createClinic } from '@/services/admin/clinics'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { WithFormDialog } from '../config'
import { showToast } from '@/helpers/toast'
import { FieldConfig } from '@/types'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AssignSchedule = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const form = useForm<IClinicSchedule>({
    resolver: valibotResolver(ClinicScheduleSchema),
    defaultValues: {},
  })

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'select',
        name: 'name',
        label: '',
        options: [],
      },
      {
        type: 'select',
        name: 'phone',
        label: '',
        options: [],
      },
    ]
  }, [])

  const onHandle = async (input: IClinicSchedule) => {
    try {
      // const res = await createClinic({ input })
      // if (res) {
      //   route.refresh()
      //   form.reset()
      //   onClose()
      //   showToast('Registro realizado con éxito', 'success')
      // }
    } catch (error) {
      showToast('Error: ' + error, 'success')
    }
  }

  return (
    <WithFormDialog
      title='Registar local:'
      form={{ inputs, form }}
      isOpen={isOpen}
      onClose={() => onClose()}
      onConfirm={onHandle}
    />
  )
}
