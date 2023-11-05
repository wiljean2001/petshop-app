import { useForm } from 'react-hook-form'
import { BreedSchema, IBreed, ISpecie } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { createBreed } from '@/services/admin/breeds'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { getSpecies } from '@/services/admin/species'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddBreed = ({ isOpen, onClose }: Props) => {
  const [species, setSpecies] = useState<ISpecie[]>([]) // Asumiendo que ISpecies es tu tipo para especies

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        const res = await getSpecies() // Asume que getSpecies es una función que obtiene las especies
        setSpecies(res)
      } catch (error) {
        console.error('Error al cargar las especies', error)
      }
    }

    if (isOpen) {
      loadSpecies()
    }
  }, [isOpen])

  const route = useRouter()
  const form = useForm<IBreed>({
    resolver: valibotResolver(BreedSchema),
    // defaultValues: {},
  })
  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Raza:',
        placeholder: 'Raza',
      },
      {
        type: 'select',
        name: 'specieId',
        label: 'Especie:',
        options: species.map((s) => ({ value: s.id!, label: s.name })), // Asumiendo que tus especies tienen 'id' y 'name'
      },
    ]
  }, [species])

  const onHandle = async (input: IBreed) => {
    try {
      const res = await createBreed({ input })
      if (res) {
        route.refresh()
        form.reset()
        onClose()
        showToast(
          '¡Éxito! La raza ha sido registrada satisfactoriamente.',
          'success'
        )
        return
      }
      showToast(
        'Advertencia: La raza no se ha registrada completamente. Por favor, completa todos los campos requeridos.',
        'success'
      )
    } catch (error) {
      showToast(
        'Error: No se pudo registrada la raza. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
  }

  return (
    <>
      <WithFormDialog
        title='Registar raza:'
        form={{ inputs, form }}
        isOpen={isOpen}
        onClose={() => onClose()}
        onConfirm={onHandle}
      />
    </>
  )
}
