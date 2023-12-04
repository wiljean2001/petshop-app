import { useForm } from 'react-hook-form'
import { OwnerSchema, IOwner } from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'
import { IUserRestrict } from '@/models/user'
import { getUsers } from '@/services/admin/users'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IOwner) => Promise<boolean>
  title: string
  initialValues?: Partial<IOwner>
}
export const FormOwner = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
  const [users, setUsers] = useState<IUserRestrict[]>([])
  const form = useForm<IOwner>({
    resolver: valibotResolver(OwnerSchema),
    // defaultValues: {},
  })

  useEffect(() => {
    if (initialValues && form) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(key as keyof IOwner, initialValues[key as keyof IOwner])
      })
    }
    const loadSchedules = async () => {
      try {
        const res = await getUsers() // Asume que getSchedule es una función que obtiene las eSchedule
        setUsers(res)
      } catch (error) {
        console.error('Error al cargar los usuarios', error)
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
      {
        type: 'select',
        name: 'userId',
        label: 'Seleccionar usuario',
        isMultiple: false,
        options: users.map((u) => ({
          label: u.name + ' - ' + u.email,
          value: u.id!,
        })),
      },
    ]
  }, [users])

  const onHandle = async (input: IOwner) => {
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
