import { useRouter } from 'next/navigation'
import { showToast } from '@/helpers/toast'
import FormAppointment from './form'
import { IAppointmentWithService } from '@/models/schemas.d'
import { createAppointment } from '@/services/admin/appointments'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddAppointment = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const onSubmit = async (input: IAppointmentWithService) => {
    const res = await createAppointment({ input })
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
      <FormAppointment
        title='Registar cita:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onSubmit}
      />
    </>
  )
}
