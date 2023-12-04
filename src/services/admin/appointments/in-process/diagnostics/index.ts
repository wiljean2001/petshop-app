import { siteConfig } from '@/config/site'
import { IDiagnostic, IServiceAppointmentArray } from '@/models/schemas.d'

export async function saveDiagnostic(
  attendanceId: string,
  input: IDiagnostic,
  diagnosisDate: Date 
) {
  const res = await fetch(
    `${siteConfig.url}/api/admin/appointments/in-process/diagnostics?attendanceId=${attendanceId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, diagnosisDate }),
    }
  )

  if (!res.ok) {
    throw new Error(`Fallo en la actualización de la cita: ${res.statusText}`)
  }

  return res.ok
}
