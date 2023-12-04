import { useEffect, useState } from 'react'
import Select from '../forms/inputs/select'
import { SelectFieldConfig } from '@/types'
import { getClinics } from '@/services/public/clinics'
import { IClinic } from '@/models/schemas.d'
import { showToast } from '@/helpers/toast'

interface SelectClinicAppointmentProps {
  clinic: string
  setClinic: (e: string) => void
}
export default function SelectClinicAppointment({
  clinic,
  setClinic,
}: SelectClinicAppointmentProps) {
  const [clinics, setClinics] = useState<IClinic[]>([])
  useEffect(() => {
    const gettingClinic = async () => {
      try {
        const clinics = await getClinics()
        if (!clinics) return []
        return setClinics(clinics)
      } catch (error) {
        showToast('Ocurrió algo durante la carga de las clinicas', 'error')
      }
    }
    gettingClinic()
  }, [])

  const clinicFieldConfig: SelectFieldConfig = {
    type: 'select',
    name: 'clinic',
    options: clinics.map((c) => ({
      label: c.name,
      value: c.id!,
    })),
    label: 'Clinica',
    isMultiple: false, // Asumiendo que solo se puede seleccionar una clínica a la vez
    isAutoFocus: true, // O true si quieres que el campo se enfoque automáticamente
  }

  const handleClinicChange = (name: string, newValue: string) => {
    setClinic(newValue)
  }

  // Simular el objeto field de react-hook-form
  const field = {
    value: clinic,
    onChange: (e: any) => {},
    onBlur: () => {}, // Puedes dejarlo vacío si no necesitas una lógica específica para onBlur
    name: 'clinic', // Nombre del campo, debe coincidir con el proporcionado en fieldConfig
    ref: () => {}, // Puedes proporcionar una función vacía si no estás usando referencias
  }

  return (
    <div className='w-60 h-16 px-2 mb-4 md:mb-0'>
      <label htmlFor='clinic' className='block text-sm font-medium'>
        Clínica:
      </label>
      <Select
        fieldConfig={clinicFieldConfig}
        setValue={handleClinicChange}
        field={field}
      />
    </div>
  )
}
