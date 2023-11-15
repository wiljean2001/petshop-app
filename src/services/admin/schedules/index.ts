import { siteConfig } from '@/config/site'
import { ScheduleSchema, ISchedule } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: ISchedule
}

function validateSchedule(Schedule: ISchedule) {
  const isValid = safeParse(ScheduleSchema, Schedule)
  if (!isValid.success) {
    throw isValid.issues
  }
}

export async function createSchedule({ input }: Props) {
  validateSchedule(input)
  const res = await fetch(`${siteConfig.url}/api/admin/schedules/`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Fallo en la creación del horario: ${res.statusText}`)
  }

  const Schedule: ISchedule = await res.json()

  return Schedule
}

export async function deleteSchedule({ id }: { id: string }) {
  const res = await fetch(`${siteConfig.url}/api/admin/schedules/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Fallo en la eliminación del horario: ${res.statusText}`)
  }

  const ok: boolean = await res.json()
  return ok
}

export async function updateSchedule({ input }: Props) {
  validateSchedule(input)
  const res = await fetch(`${siteConfig.url}/api/admin/schedules/${input.id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Fallo en la actualización del horario: ${res.statusText}`)
  }

  const Schedule: ISchedule = await res.json()

  return Schedule
}
