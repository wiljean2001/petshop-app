import { ServiceStatusKey } from '@/config/const'
import { siteConfig } from '@/config/site'
import { IService } from '@/models/schemas.d'

export async function getServices({ state }: { state?: ServiceStatusKey }) {
  const res = await fetch(
    `${siteConfig.url}/api/admin/services${state ? `?state=${state}` : ''}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`)
  }

  const services: IService[] = await res.json()
  return services
}
