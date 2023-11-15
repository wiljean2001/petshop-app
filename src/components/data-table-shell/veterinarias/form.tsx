import { useForm } from 'react-hook-form'
import { IClinic, IVeterinarian, VeterinarianSchema } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { getClinics } from '@/services/public/clinics/'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IVeterinarian) => Promise<boolean>
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
  const form = useForm<IVeterinarian>({
    resolver: valibotResolver(VeterinarianSchema),
    defaultValues: {},
  })

  const [clinics, setClinics] = useState<IClinic[]>([])
  useEffect(() => {
    if (initialValues && form) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(
          key as keyof IVeterinarian,
          initialValues[key as keyof IVeterinarian]
        )
      })
    }

    const loadClinics = async () => {
      try {
        const res = await getClinics() // Asume que getBreeds es una función que obtiene las eBreeds
        setClinics(res)
      } catch (error) {
        console.error('Error al cargar las clinicas', error)
      }
    }
    if (isOpen) {
      loadClinics()
    }
  }, [form, initialValues, isOpen]) // Este efecto se ejecutará una vez, similar a componentDidMount

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
        isMultiple: false,
        label: 'Clinica',
        options: clinics.map((c) => ({ value: c.id!, label: c.name })),
      },
    ]
  }, [clinics])

  const onHandle = async (input: IVeterinarian) => {
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
