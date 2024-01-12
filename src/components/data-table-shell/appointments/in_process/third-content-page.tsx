'use client'

import { IAppointment, IAttendance, IPrescription } from '@/models/schemas.d'
import FormAttendances from './form-attendance'
import FormPrescription from './form-prescription'
import { showToast } from '@/helpers/toast'
import { savePrescription } from '@/services/admin/appointments/in-process/prescriptions'

interface Props {
  appointment: IAppointment
  attendance: IAttendance
}
export default function ThirdContentPage({ appointment, attendance }: Props) {
  console.log('🚀 ~ ThirdContentPage ~ appointment:', appointment)
  const onHandleConfirm = async (data: IPrescription) => {
    showToast(
      '¿Está seguro de querer guardar estos detalles?. Confirmar acción.',
      'warning',
      async () => {
        try {
          const res = await savePrescription(
            attendance.id!,
            data,
            appointment.beginningDateTime!
          )
          if (res) {
            showToast(
              '¡Éxito! El diagnóstico se guardó correctamente.',
              'success'
            )
            return true
          }
        } catch (error) {}

        showToast(
          'Advertencia: El diagnósitico no se ha guardado. ' +
            'Por favor, completa todos los campos requeridos.',
          'warning'
        )
        return false
      },
      'Confirmar'
    )
    return false
  }

  return (
    // Here register the prescription generated for veterinarian and all items for specificated details
    <FormPrescription
      prescription={appointment.Attendances.Prescription}
      onConfirm={onHandleConfirm}
    />
  )
}
