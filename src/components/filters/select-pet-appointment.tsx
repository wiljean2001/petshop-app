import { useEffect, useState } from 'react'
import Select from '../forms/inputs/select'
import { SelectFieldConfig } from '@/types'
import { getPets } from '@/services/admin/pets'
import { IPet } from '@/models/schemas.d'
import { showToast } from '@/helpers/toast'

interface SelectPetAppointmentProps {
  pet: string
  owner?: string
  setPet: (e: string) => void
}
export default function SelectPetAppointment({
  pet,
  owner,
  setPet,
}: SelectPetAppointmentProps) {
  const [pets, setPets] = useState<IPet[]>([])

  useEffect(() => {
    const gettingPet = async () => {
      try {
        const pets = await getPets({ owner })
        if (!pets) return []
        return setPets(pets)
      } catch (error) {
        showToast('Ocurrió algo durante la carga de las mascotas.', 'error')
      }
    }
    if (owner) {
      gettingPet()
    }
  }, [owner])

  const PetFieldConfig: SelectFieldConfig = {
    type: 'select',
    name: 'pet',
    options: pets.map((c) => ({
      label:
        c.name +
        ' - ' +
        c.breed?.name +
        ' < ' +
        c.owner?.surname +
        ' ' +
        c.owner?.name,
      value: c.id!,
    })),
    label: '',
    isMultiple: false, // Asumiendo que solo se puede seleccionar una clínica a la vez
    isAutoFocus: true, // O true si quieres que el campo se enfoque automáticamente
  }

  const handlePetChange = (name: string, newValue: string) => {
    setPet(newValue)
  }

  // Simular el objeto field de react-hook-form
  const field = {
    value: pet,
    onChange: (e: any) => {},
    onBlur: () => {}, // Puedes dejarlo vacío si no necesitas una lógica específica para onBlur
    name: 'pet', // Nombre del campo, debe coincidir con el proporcionado en fieldConfig
    ref: () => {}, // Puedes proporcionar una función vacía si no estás usando referencias
  }

  return (
    <div className='w-60 h-16 px-2 mb-4 md:mb-0'>
      <label htmlFor='pet' className='block text-sm font-medium'>
        Mascota:
      </label>
      <Select
        fieldConfig={PetFieldConfig}
        setValue={handlePetChange}
        field={field}
      />
    </div>
  )
}
