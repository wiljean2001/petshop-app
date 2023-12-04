'use client'
import { Button } from '@/components/ui/button'
import { showToast } from '@/helpers/toast'
import { endAppointmentAttendance } from '@/services/admin/appointments'
import { useRouter } from 'next/navigation'

export default function ButtonEndAttendance({
  apointmentId,
}: {
  apointmentId: string
}) {
  const route = useRouter()

  const handleClickFinalizeAppointment = async () => {
    showToast(
      '¿Está seguro de querer finalizar la atención?. Confirmar acción.',
      'warning',
      async () => {
        try {
          const res = await endAppointmentAttendance(apointmentId)
          if (res) {
            showToast(
              '¡Éxito! La cita ha sido registrada satisfactoriamente.',
              'success'
            )
            route.refresh()
          }
          showToast(
            'Advertencia: Algo surgió durante la finalización de la atención.',
            'warning'
          )
        } catch (error) {
          showToast(
            'Error: Algo surgió durante la finalización de la atención.',
            'error'
          )
        }
      },
      'Eliminar'
    )
  }

  return (
    <>
      <Button
        variant={'destructive'}
        onClick={() => handleClickFinalizeAppointment()}
      >
        Finalizar atención
      </Button>
    </>
  )
}
