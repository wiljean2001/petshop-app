import { useForm } from 'react-hook-form'
import { SpecieSchema, ISpecie } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { createSpecie } from '@/services/admin/species'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddSpecie = ({ isOpen, onClose }: Props) => {
  const router = useRouter()
  const form = useForm<ISpecie>({
    resolver: valibotResolver(SpecieSchema),
    // defaultValues: {},
  })

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
      const res = await createSpecie({ input })
      if (res) {
        router.refresh()
        form.reset()
        onClose()
        showToast(
          '¡Éxito! La Especie ha sido registrado satisfactoriamente.',
          'success'
        )
        return
      }

      showToast(
        'Advertencia: La especie no se ha registrado completamente. Por favor, completa todos los campos requeridos.',
        'warning'
      )
    } catch (error) {
      showToast(
        'Error: No se pudo registrar la especie. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
  }

  return (
    <>
      <WithFormDialog
        title='Registar especie:'
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
