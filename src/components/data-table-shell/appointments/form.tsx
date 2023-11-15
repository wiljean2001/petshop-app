import { useForm } from 'react-hook-form'
import { BreedSchema, IBreed, ISpecie } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { getSpecies } from '@/services/admin/species'
import { useMounted } from '@/hooks/use-mounted'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IBreed) => Promise<boolean>
  title: string
  initialValues?: Partial<IBreed>
}
export const FormBreed = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
  const mouted = useMounted()
  const [species, setSpecies] = useState<ISpecie[]>([]) // Asumiendo que ISpecies es tu tipo para especies
  const form = useForm<IBreed>({
    resolver: valibotResolver(BreedSchema),
    // defaultValues: {},
  })
  useEffect(() => {
    if (initialValues && form && isOpen) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(key as keyof ISpecie, initialValues[key as keyof ISpecie])
      })
    }

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
  }, [form, initialValues, isOpen])

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
        isMultiple: false,
        label: 'Especie:',
        options: species.map((s) => ({ value: s.id!, label: s.name })), // Asumiendo que tus especies tienen 'id' y 'name'
      },
    ]
  }, [species])

  const onHandle = async (input: IBreed) => {
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

  if (!mouted) return
  return (
    <>
      <WithFormDialog
        title={title}
        form={{ inputs, form }}
        isOpen={isOpen}
        onClose={() => onClose()}
        onConfirm={onHandle}
      />
    </>
  )
}
