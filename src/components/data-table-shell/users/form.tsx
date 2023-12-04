import { useForm } from 'react-hook-form'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'
import { ISingUpForm, SignUpSchema } from '@/models/user'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: ISingUpForm) => Promise<boolean>
  title: string
  initialValues?: Partial<ISingUpForm>
}

export const FormUser = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
  const form = useForm<ISingUpForm>({
    resolver: valibotResolver(SignUpSchema),
    // defaultValues: {},
  })

  useEffect(() => {
    if (initialValues && form) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(
          key as keyof ISingUpForm,
          initialValues[key as keyof ISingUpForm]
        )
      })
    }
  }, [form, initialValues])

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre:',
        placeholder: 'Nombre',
      },
      {
        type: 'text',
        name: 'name',
        label: 'Correo electrónico:',
        placeholder: '',
      },
      {
        type: 'password',
        name: 'name',
        label: 'Contraseña:',
        placeholder: '',
      },
    ]
  }, [])

  const onHandle = async (input: ISingUpForm) => {
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
