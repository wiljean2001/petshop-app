import { siteConfig } from '@/config/site'
import { IServiceAppointmentArray } from '@/models/schemas.d'

export async function SaveServicesWithOptionalClinicalData(
  appointmentId: string,
  input: IServiceAppointmentArray,
  dateTime: Date
) {
  const res = await fetch(
    `${siteConfig.url}/api/admin/appointments/in-process/services?appointmentId=${appointmentId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, dateTime }),
    }
  )

  if (!res.ok) {
    throw new Error(`Fallo en la actualización de la cita: ${res.statusText}`)
  }

  return res.ok
}
