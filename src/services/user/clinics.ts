import { siteConfig } from '@/config/site'
import { ClinicSchema, IClinic } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: IClinic
}

export async function getClinics() {
  const res = await fetch(`${siteConfig.url}/api/admin/clinics/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to create clinic: ${res.statusText}`)
  }

  const clinics: IClinic[] = await res.json()
  console.log('🚀 ~ file: clinics.ts:20 ~ getClinics ~ clinics:', clinics)
  return clinics
}
