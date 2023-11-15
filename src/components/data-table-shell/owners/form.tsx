import { useForm } from 'react-hook-form'
import { OwnerSchema, IOwner } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'

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
  }, [form, initialValues])

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
