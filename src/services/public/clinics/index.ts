import { siteConfig } from '@/config/site'
import { IClinic } from '@/models/schemas'

interface Props {
  input: IClinic
}

export async function getClinics() {
  const res = await fetch(`${siteConfig.url}/api/admin/clinics/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`)
  }

  const clinics: IClinic[] = await res.json()
  return clinics
}
