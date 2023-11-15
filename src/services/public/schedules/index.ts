import { siteConfig } from '@/config/site'
import { ISchedule } from '@/models/schemas'

export async function getSchedules() {
  const res = await fetch(`${siteConfig.url}/api/admin/schedules/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`)
  }

  const schedules: ISchedule[] = await res.json()
  return schedules
}
