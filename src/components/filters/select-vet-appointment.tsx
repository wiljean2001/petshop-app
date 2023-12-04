import { useEffect, useState } from 'react'
import Select from '../forms/inputs/select'
import { SelectFieldConfig } from '@/types'
import { getVeterinarians } from '@/services/admin/veterinarias'
import { IVeterinarian } from '@/models/schemas.d'
import { showToast } from '@/helpers/toast'

interface SelectPetAppointmentProps {
  vet: string
  clinic?: string
  setVet: (e: string) => void
}
export default function SelectPetAppointment({
  vet,
  clinic,
  setVet,
}: SelectPetAppointmentProps) {
  const [vets, setVets] = useState<IVeterinarian[]>([])
  useEffect(() => {
    const gettingPet = async () => {
      try {
        const vets = await getVeterinarians({ clinic })
        if (!vets) return []
        return setVets(vets)
      } catch (error) {
        showToast('Ocurrió algo durante la carga de los veterinarios.', 'error')
      }
    }
    if (clinic) {
      gettingPet()
    }
  }, [clinic])

  const PetFieldConfig: SelectFieldConfig = {
    type: 'select',
    name: 'vet',
    options: vets.map((c) => ({
      label: c.name,
      value: c.id!,
    })),
    label: '',
    isMultiple: false, // Asumiendo que solo se puede seleccionar una clínica a la vez
    isAutoFocus: true, // O true si quieres que el campo se enfoque automáticamente
  }

  const handlePetChange = (name: string, newValue: string) => {
    setVet(newValue)
  }

  // Simular el objeto field de react-hook-form
  const field = {
    value: vet,
    onChange: (e: any) => {},
    onBlur: () => {}, // Puedes dejarlo vacío si no necesitas una lógica específica para onBlur
    name: 'vet', // Nombre del campo, debe coincidir con el proporcionado en fieldConfig
    ref: () => {}, // Puedes proporcionar una función vacía si no estás usando referencias
  }

  return (
    <div className='w-60 h-16 px-2 mb-4 md:mb-0'>
      <label htmlFor='vet' className='block text-sm font-medium'>
        Veterinarios:
      </label>
      <Select
        fieldConfig={PetFieldConfig}
        setValue={handlePetChange}
        field={field}
      />
    </div>
  )
}
