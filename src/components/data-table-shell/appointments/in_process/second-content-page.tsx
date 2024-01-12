'use client'

import { IAppointment, IAttendance, IDiagnostic } from '@/models/schemas.d'
import FormAttendances from './form-attendance'
import FormDiagnostic from './form-diagnostic'
import { showToast } from '@/helpers/toast'
import { saveDiagnostic } from '@/services/admin/appointments/in-process/diagnostics'

interface Props {
  appointment: IAppointment
  attendance: IAttendance
}
export default function SecondContentPage({ appointment, attendance }: Props) {
  const onHandleConfirm = async (data: IDiagnostic) => {
    showToast(
      '¿Está seguro de querer guardar estos detalles?. Confirmar acción.',
      'warning',
      async () => {
        try {
          const res = await saveDiagnostic(
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
    // Here register the diagnostic of veterinarian for the pet
    <FormDiagnostic
      diagnostic={appointment.Attendances.Diagnostics}
      onConfirm={onHandleConfirm}
    />
  )
}
