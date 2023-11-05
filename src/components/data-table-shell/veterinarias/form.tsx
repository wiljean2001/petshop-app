import { useForm } from 'react-hook-form'
import { IVeterinarian, VeterinarianSchema } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { createVeterinarian } from '@/services/admin/veterinarias'
import { FieldConfig, Option } from '@/types'
import { getClinics } from '@/services/user/clinics'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IVeterinarian) => void
  title: string
  initialValues?: Partial<IVeterinarian>
}
export const FormVeterinarian = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
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

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        placeholder: 'Nombres',
        label: 'Nombres:',
      },
      {
        type: 'text',
        name: 'surname',
        placeholder: 'Apellidos',
        label: 'Apellidos',
      },
      {
        type: 'tel',
        name: 'phone',
        placeholder: 'Teléfono',
        label: 'Teléfono',
      },
      {
        type: 'text',
        name: 'specialty',
        placeholder: 'Especialidad',
        label: 'Especialidad',
      },
      {
        type: 'email',
        name: 'email',
        placeholder: 'Correo electrónico',
        label: 'Correo electrónico',
      },
      {
        type: 'select',
        name: 'clinicId',
        label: 'Clinica',
        options: clinics,
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
      title={title}
      form={{ inputs, form }}
      isOpen={isOpen}
      onClose={() => onClose()}
      onConfirm={onHandle}
    />
  )
}
