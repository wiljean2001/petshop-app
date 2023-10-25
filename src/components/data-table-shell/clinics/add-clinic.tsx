import { CustomOptionInput } from '@/components/forms/Form'
import { useForm } from 'react-hook-form'
import { ClinicSchema, IClinic } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { createClinic } from '@/services/admin/clinics'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { WithFormDialog } from '../config'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddClinic = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const form = useForm<IClinic>({
    resolver: valibotResolver(ClinicSchema),
    // defaultValues: {},
  })

  const inputs: CustomOptionInput[] = useMemo(() => {
    return [
      {
        type: 'text',
        name: 'name',
        autoComplete: 'name_clinic',
        placeHolder: 'Nombre del local',
        className: 'mb-1 col-span-3',
      },
      {
        type: 'tel',
        name: 'phone',
        autoComplete: 'phone_number',
        placeHolder: 'Teléfono',
        className: 'mb-1 col-span-1',
      },
      {
        type: 'text',
        name: 'location',
        autoComplete: 'location',
        placeHolder: 'Ubicación',
        className: 'mb-1 col-span-4',
      },
    ]
  }, [])

  const onHandle = async (input: IClinic) => {
    try {
      const res = await createClinic({ input })
      if (res) {
        route.refresh()
        onClose()
      }
    } catch (error) {
      console.log('🚀 ~ add clinic ~ onHandle ~ error:', error)
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
