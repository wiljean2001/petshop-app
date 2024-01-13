'use client'

import { IAttendance, IDiagnostic } from '@/models/schemas.d'
import FormDiagnostic from './form-diagnostic'
import { showToast } from '@/helpers/toast'
import { saveDiagnostic } from '@/services/admin/appointments/in-process/diagnostics'

interface Props {
  diagnostic: IDiagnostic
  attendance: IAttendance
  beginningDateTime: Date
}
export default function SecondContentPage({
  diagnostic,
  attendance,
  beginningDateTime,
}: Props) {
  const onHandleConfirm = async (data: IDiagnostic) => {
    showToast(
      '¿Está seguro de querer guardar estos detalles?. Confirmar acción.',
      'warning',
      async () => {
        try {
          const res = await saveDiagnostic(
            attendance.id!,
            data,
            beginningDateTime
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
    <FormDiagnostic diagnostic={diagnostic} onConfirm={onHandleConfirm} />
  )
}
