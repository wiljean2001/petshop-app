import { useRouter } from 'next/navigation'
import { showToast } from '@/helpers/toast'
import { IAppointment, IServiceAppointmentArray } from '@/models/schemas.d'
import {
  createAppointment,
  updateOnlyServicesForAndByAppointment,
} from '@/services/admin/appointments'
import FormUpdateOnlyServices from './form'

interface Props {
  isOpen: boolean
  onClose: () => void
  appointment: IAppointment
}

export const DialogUpdateOnlyServices = ({
  isOpen,
  onClose,
  appointment,
}: Props) => {
  const route = useRouter()
  const onSubmit = async (input: IServiceAppointmentArray) => {
    const res = await updateOnlyServicesForAndByAppointment(
      appointment.id,
      input
    )
    if (res) {
      showToast(
        '¡Éxito! La cita ha sido registrada satisfactoriamente.',
        'success'
      )
      route.refresh()
      return true
    }
    showToast(
      'Advertencia: La cita no se ha registrada completamente. ' +
        'Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }
  return (
    <>
      <FormUpdateOnlyServices
        appointment={appointment}
        title='Servicios:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onSubmit}
      />
    </>
  )
}
