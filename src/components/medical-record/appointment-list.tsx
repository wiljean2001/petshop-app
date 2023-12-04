import { MedicalRecord } from '@/types'
import AppointmentDetails from './appointment-details'

interface AppointmentsListProps {
  appointments: MedicalRecord['Appointments']
}
const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
}) => {
  return (
    <div className='shadow-md rounded-lg p-4 my-4'>
      <h2 className='text-xl font-semibold mb-2'>Citas</h2>
      {appointments.map((appointment) => (
        <AppointmentDetails key={appointment.id} appointment={appointment} />
      ))}
    </div>
  )
}

export default AppointmentsList
