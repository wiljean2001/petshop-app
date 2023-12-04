import { AppointmentStatusKey } from '@/config/const'
import { siteConfig } from '@/config/site'
import {
  AppointmentWithServiceSchema,
  IAppointmentOnlyUpdate,
  IAppointmentWithService,
  IServiceAppointmentArray,
} from '@/models/schemas.d'
import { safeParse } from 'valibot'

interface Props {
  input: IAppointmentWithService
}

function validateAppointment(appointment: IAppointmentWithService) {
  const isValid = safeParse(AppointmentWithServiceSchema, appointment)
  if (!isValid.success) {
    throw isValid.issues
  }
}

export async function getAppointmentById({
  id,
  withClinic,
}: {
  id: string
  withClinic: boolean
}) {
  const res = await fetch(
    `${siteConfig.url}/api/admin/appointments/${id}/${
      withClinic ? `?withClinic=${withClinic}` : ''
    }`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`)
  }

  const appointments: IAppointmentOnlyUpdate = await res.json()
  return appointments
}

/**
 *
 * @param input > IAppointmentWithService
 * @returns
 */
export async function createAppointment({ input }: Props) {
  console.log('🚀 ~ file: index.ts:52 ~ createAppointment ~ input:', input)
  validateAppointment(input)
  console.log('🚀 ~ file: index.ts:53 ~ createAppointment ~ input:', input)
  const res = await fetch(`${siteConfig.url}/api/admin/appointments/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error(`Fallo en la creación de la cita: ${res.statusText}`)
  }

  const appointment: IAppointmentWithService = await res.json()

  return appointment
}

/**
 *
 * @param id
 * @param state
 * @returns
 */
export async function updateStateSchedule(
  id: string,
  state: AppointmentStatusKey
) {
  const res = await fetch(`${siteConfig.url}/api/admin/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(state),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Fallo en la actualización de la cita: ${res.statusText}`)
  }

  const appointment: IAppointmentWithService = await res.json()

  return appointment
}

/**
 *
 * @param id
 * @param input
 * @returns
 */
export async function updateAppointment(
  id: string,
  input: IAppointmentOnlyUpdate
) {
  const res = await fetch(`${siteConfig.url}/api/admin/appointments/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error(`Fallo en la actualización de la cita: ${res.statusText}`)
  }

  const appointment: IAppointmentWithService = await res.json()

  return appointment
}
export async function updateOnlyServicesForAndByAppointment(
  appointmentId: string,
  input: IServiceAppointmentArray
) {
  const res = await fetch(
    `${siteConfig.url}/api/admin/appointments/${appointmentId}/services`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }
  )

  if (!res.ok) {
    throw new Error(`Fallo en la actualización de la cita: ${res.statusText}`)
  }

  const appointment: IAppointmentWithService = await res.json()

  return appointment
}

export async function cancelAppointment(id: string) {
  const res = await fetch(`${siteConfig.url}/api/admin/appointments/cancel/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id),
  })

  if (!res.ok) {
    throw new Error(`Fallo en la actualización de la cita: ${res.statusText}`)
  }

  const appointment: IAppointmentWithService = await res.json()

  return appointment
}

export async function endAppointmentAttendance(id: string) {
  const res = await fetch(`${siteConfig.url}/api/admin/appointments/finalize/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id),
  })

  if (!res.ok) {
    throw new Error(`Fallo en la actualización de la cita: ${res.statusText}`)
  }

  const appointment: IAppointmentWithService = await res.json()

  return appointment
}
