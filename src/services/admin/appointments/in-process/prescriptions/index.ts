import { siteConfig } from '@/config/site'
import { IPrescription } from '@/models/schemas.d'

export async function savePrescription(
  attendanceId: string,
  input: IPrescription,
  emissionDate: Date
) {
  const res = await fetch(
    `${siteConfig.url}/api/admin/appointments/in-process/prescriptions?attendanceId=${attendanceId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, emissionDate }),
    }
  )

  if (!res.ok) {
    throw new Error(`Fallo en la actualización de la cita: ${res.statusText}`)
  }

  return res.ok
}
