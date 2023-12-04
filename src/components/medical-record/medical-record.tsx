import PetDetails from './pet-details'
import AppointmentsList from './appointment-list'
import { MedicalRecord } from '@/types'

interface MedicalRecordProps {
  record: MedicalRecord | null
}
const MedicalRecord: React.FC<MedicalRecordProps> = ({ record }) => {
  if (!record) {
    return (
      <div className='p-4 bg-yellow-100 text-yellow-800 rounded-lg'>
        No se encontraron registros médicos para esta mascota.
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4 shadow-sm rounded'>
      <PetDetails pet={record} />
      <AppointmentsList appointments={record.Appointments} />
      {/* Puedes añadir aquí más componentes según sea necesario */}
    </div>
  )
}

export default MedicalRecord
