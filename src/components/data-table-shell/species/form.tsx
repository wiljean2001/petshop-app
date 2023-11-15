import { useForm } from 'react-hook-form'
import { SpecieSchema, ISpecie } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { createSpecie } from '@/services/admin/species'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: ISpecie) => Promise<boolean>
  title: string
  initialValues?: Partial<ISpecie>
}
export const FormSpecie = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
  const form = useForm<ISpecie>({
    resolver: valibotResolver(SpecieSchema),
    // defaultValues: {},
  })

  useEffect(() => {
    if (initialValues && form) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(key as keyof ISpecie, initialValues[key as keyof ISpecie])
      })
    }
  }, [form, initialValues])

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Especie:',
        placeholder: 'Especie',
      },
    ]
  }, [])

  const onHandle = async (input: ISpecie) => {
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
