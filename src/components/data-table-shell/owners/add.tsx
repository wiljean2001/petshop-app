import { useForm } from 'react-hook-form'
import { OwnerSchema, IOwner } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { createOwner } from '@/services/admin/owners'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddOwner = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const form = useForm<IOwner>({
    resolver: valibotResolver(OwnerSchema),
    // defaultValues: {},
  })

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Nombres:',
        placeholder: 'Nombres',
      },
      {
        type: 'text',
        name: 'surname',
        label: 'Apellidos:',
        placeholder: 'Apellidos',
      },
      {
        type: 'text',
        name: 'city',
        label: 'Ciudad:',
        placeholder: 'Ciudad',
      },
      {
        type: 'text',
        name: 'address',
        label: 'Dirección:',
        placeholder: 'Dirección',
      },
      {
        type: 'tel',
        name: 'phone',
        label: 'Número de Teléfono:',
        placeholder: 'Teléfono',
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo electrónico:',
        placeholder: 'Correo electrónico',
      },
    ]
  }, [])

  const onHandle = async (input: IOwner) => {
    try {
      const res = await createOwner({ input })
      if (res) {
        route.refresh()
        form.reset()
        showToast(
          '¡Éxito! El dueño de la mascota ha sido registrado satisfactoriamente.',
          'success'
        )
        onClose()
        return
      }
      showToast(
        'Advertencia: El dueño de la mascota no se ha registrado completamente. Por favor, completa todos los campos requeridos.',
        'warning'
      )
    } catch (error) {
      showToast(
        'Error: No se pudo registrar el dueño de la mascota. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
  }

  return (
    <>
      <WithFormDialog
        title='Registar dueño de mascota:'
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
