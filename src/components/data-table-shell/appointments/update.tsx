import { useRouter } from 'next/navigation'
import { showToast } from '@/helpers/toast'
import FormAppointment from './form'
import { IAppointmentOnlyUpdate } from '@/models/schemas.d'
import {
  getAppointmentById,
  updateAppointment,
} from '@/services/admin/appointments'
import FormUpdateAppointment from './form-update'
import { useEffect, useState } from 'react'
import { AppointmentStatusKey } from '@/config/const'

interface Props {
  isOpen: boolean
  onClose: () => void
  appointmentId: string
}
export const UpdateAppointment = ({
  isOpen,
  onClose,
  appointmentId,
}: Props) => {
  const router = useRouter()
  const [appointment, setAppointment] = useState<{
    clinic?: string
    appointmentStatus?: AppointmentStatusKey
    scheduledDateTime?: Date
  }>({
    clinic: undefined,
    appointmentStatus: undefined,
    scheduledDateTime: undefined,
  })

  useEffect(() => {
    const getAppointment = () => {
      try {
        getAppointmentById({ id: appointmentId, withClinic: true }).then(
          (_appointment) => {
            if (_appointment) {
              setAppointment({
                clinic: _appointment.clinicId!,
                appointmentStatus: _appointment.status,
                scheduledDateTime: _appointment.scheduledDateTime,
              })
            }
          }
        )
      } catch (error) {
        showToast('No fue posible obtener la cita.', 'error')
      }
    }
    getAppointment()
  }, [appointmentId])
  
  const onSubmit = async (input: IAppointmentOnlyUpdate) => {
    const res = await updateAppointment(appointmentId, input)
    if (res) {
      showToast(
        '¡Éxito! La cita ha sido actualziada satisfactoriamente.',
        'success'
      )
      router.refresh()
      return true
    }
    showToast(
      'Advertencia: La cita no se ha actualziada completamente. ' +
        'Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }
  return (
    <>
      <FormUpdateAppointment
        title='Actualizar cita:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onSubmit}
        initialValues={appointment}
      />
    </>
  )
}
