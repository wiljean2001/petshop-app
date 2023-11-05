import { useForm } from 'react-hook-form'
import { ClinicSchema, IClinic } from '@/models/schemas'
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
export const AddClinic = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const form = useForm<IClinic>({
    resolver: valibotResolver(ClinicSchema),
    defaultValues: {
      image: '',
    },
  })

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: '',
        placeholder: 'Nombre del local',
        // autoComplete: 'name_clinic',
        // className: 'mb-1 col-span-3',
      },
      {
        type: 'tel',
        name: 'phone',
        label: '',
        placeholder: 'Teléfono',
        // autoComplete: 'phone_number',
        // className: 'mb-1 col-span-1',
      },
      {
        type: 'text',
        name: 'location',
        label: '',
        placeholder: 'Ubicación',
        // autoComplete: 'location',
        // className: 'mb-1 col-span-4',
      },
      // {
      //   type: 'text',
      //   name: 'image',
      //   label: '',
      //   placeholder: 'image_clinic',
      //   // autoComplete: 'image_clinic',
      //   // className: 'mb-1 col-span-4',
      // },
    ]
  }, [])

  const onHandle = async (input: IClinic) => {
    try {
      const res = await createClinic({ input })
      if (res) {
        route.refresh()
        form.reset()
        onClose()
        showToast('Registro realizado con éxito', 'success')
      }
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
