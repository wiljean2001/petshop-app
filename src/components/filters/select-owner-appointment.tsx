import { useEffect, useState } from 'react'
import Select from '../forms/inputs/select'
import { SelectFieldConfig } from '@/types'
import { getOwners } from '@/services/admin/owners'
import { IOwner } from '@/models/schemas.d'
import { showToast } from '@/helpers/toast'

interface SelectPetAppointmentProps {
  owner: string
  setOwner: (e: string) => void
}
export default function SelectPetAppointment({
  owner,
  setOwner,
}: SelectPetAppointmentProps) {
  const [owners, setOwners] = useState<IOwner[]>([])
  useEffect(() => {
    const gettingPet = async () => {
      try {
        const owners = await getOwners()
        if (!owners) return []
        return setOwners(owners)
      } catch (error) {
        showToast('Ocurrió algo durante la carga de los veterinarios.', 'error')
      }
    }
    gettingPet()
  }, [])

  const PetFieldConfig: SelectFieldConfig = {
    type: 'select',
    name: 'owner',
    options: owners.map((c) => ({
      label: c.name,
      value: c.id!,
    })),
    label: '',
    isMultiple: false, // Asumiendo que solo se puede seleccionar una clínica a la vez
    isAutoFocus: true, // O true si quieres que el campo se enfoque automáticamente
  }

  const handlePetChange = (name: string, newValue: string) => {
    setOwner(newValue)
  }

  // Simular el objeto field de react-hook-form
  const field = {
    value: owner,
    onChange: (e: any) => {},
    onBlur: () => {}, // Puedes dejarlo vacío si no necesitas una lógica específica para onBlur
    name: 'owner', // Nombre del campo, debe coincidir con el proporcionado en fieldConfig
    ref: () => {}, // Puedes proporcionar una función vacía si no estás usando referencias
  }

  return (
    <div className='w-60 h-16 px-2 mb-4 md:mb-0'>
      <label htmlFor='owner' className='block text-sm font-medium'>
        Dueños de mascotas:
      </label>
      <Select
        fieldConfig={PetFieldConfig}
        setValue={handlePetChange}
        field={field}
      />
    </div>
  )
}
