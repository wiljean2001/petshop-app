import { CustomOptionInput } from '@/components/forms/Form'
import { useForm } from 'react-hook-form'
import { IClinic, IVeterinarian, VeterinarianSchema } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { createVeterinarian } from '@/services/admin/veterinarias'
import { Option } from '@/types'
import { getClinics } from '@/services/user/clinics'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddVeterinarian = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const form = useForm<IVeterinarian>({
    resolver: valibotResolver(VeterinarianSchema),
    defaultValues: {},
  })

  const [clinics, setClinics] = useState<Option[]>([])
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const input = await getClinics()
        const output = input.map((item) => ({
          label: item.name,
          value: item.id ?? '',
        }))
        setClinics(output)
      } catch (error) {
        console.error('Error fetching clinics:', error)
      }
    }

    fetchClinics()
  }, []) // Este efecto se ejecutará una vez, similar a componentDidMount

  const inputs = useMemo((): CustomOptionInput[] => {
    return [
      {
        type: 'text',
        name: 'name',
        autoComplete: 'name_veterinarian',
        placeHolder: 'Nombres',
        label: 'Nombres:',
        className: 'mb-1 col-span-4',
      },
      {
        type: 'text',
        name: 'surname',
        autoComplete: 'surname',
        placeHolder: 'Apellidos',
        label: 'Apellidos',
        className: 'mb-1 col-span-4',
      },
      {
        type: 'tel',
        name: 'phone',
        autoComplete: 'phone_number',
        placeHolder: 'Teléfono',
        label: 'Teléfono',
        className: 'mb-1 col-span-1',
      },
      {
        type: 'text',
        name: 'specialty',
        autoComplete: 'specialty',
        placeHolder: 'Especialidad',
        label: 'Especialidad',
        className: 'mb-1 col-span-3',
      },
      {
        type: 'email',
        name: 'email',
        autoComplete: 'email',
        placeHolder: 'Correo electrónico',
        label: 'Correo electrónico',
        className: 'mb-1 col-span-4',
      },
      {
        type: 'hidden',
        name: 'clinicId',
        autoComplete: 'clinicId',
        placeHolder: 'Clinica',
        items: clinics,
        className: 'mb-1 col-span-4',
      },
    ]
  }, [clinics])

  const onHandle = async (input: IVeterinarian) => {
    try {
      const res = await createVeterinarian({ input })
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
      title='Registar veterinario:'
      form={{ inputs, form }}
      isOpen={isOpen}
      onClose={() => onClose()}
      onConfirm={onHandle}
    />
  )
}
