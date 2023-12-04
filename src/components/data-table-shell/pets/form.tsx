import { useForm } from 'react-hook-form'
import { PetSchema, IPet, IBreed, IOwner } from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { getBreeds } from '@/services/admin/breeds'
import { getOwners } from '@/services/admin/owners'
import { useRouter } from 'next/navigation'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IPet) => Promise<boolean>
  title: string
  initialValues?: Partial<IPet>
}
export const FormPet = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
  const [breeds, setBreeds] = useState<IBreed[]>([]) // Asumiendo que IBreeds es tu tipo para eBreeds
  const [owners, setOwners] = useState<IOwner[]>([]) // Asumiendo que IBreeds es tu tipo para eBreeds
  // form
  const form = useForm<IPet>({
    resolver: valibotResolver(PetSchema),
    // defaultValues: {},
  })

  useEffect(() => {
    if (initialValues && form && isOpen) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(key as keyof IPet, initialValues[key as keyof IPet])
      })
    }

    const loadBreeds = async () => {
      try {
        const res = await getBreeds() // Asume que getBreeds es una función que obtiene las eBreeds
        setBreeds(res)
      } catch (error) {
        console.error('Error al cargar las eBreeds', error)
      }
    }
    const loadOwners = async () => {
      try {
        const res = await getOwners() // Asume que getBreeds es una función que obtiene las eBreeds
        setOwners(res)
      } catch (error) {
        console.error('Error al cargar las eBreeds', error)
      }
    }

    if (isOpen) {
      loadBreeds()
      loadOwners()
    }
  }, [isOpen, initialValues, form])

  const onHandle = async (input: IPet) => {
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

  // inputs
  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Nombres:',
        placeholder: 'Nombres',
      },
      {
        type: 'date',
        name: 'birthdate',
        label: 'Fecha de nacimiento:',
        withTime: true,
      },
      {
        type: 'text',
        name: 'gender',
        label: 'Género:',
        placeholder: 'Macho / hembra',
      },
      {
        type: 'text',
        name: 'color',
        label: 'Color:',
        placeholder: 'Color de la mascota',
      },
      {
        type: 'select',
        name: 'ownerId',
        isMultiple: false,
        label: 'Dueño:',
        options: owners.map((o) => ({
          value: o.id!,
          label: o.name + ' ' + o.surname,
        })),
      },
      {
        type: 'select',
        name: 'breedId',
        isMultiple: false,
        label: 'Raza:',
        options: breeds.map((r) => ({ value: r.id!, label: r.name })),
      },
      {
        type: 'area',
        name: 'medicalNotes',
        label: 'Notas médicas: (opc.)',
        placeholder: 'Notas médicas',
      },
      {
        type: 'text',
        name: 'derivedFrom',
        label: 'Derivado de: (opc.)',
        placeholder: 'Lugar de derivación',
      },
    ]
  }, [breeds, owners])

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
