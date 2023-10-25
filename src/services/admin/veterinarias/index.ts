import { siteConfig } from '@/config/site'
import { ClinicSchema, IVeterinarian } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: IVeterinarian
}

function validateVeterinarian(veterinarian: IVeterinarian) {
  const isValid = safeParse(ClinicSchema, veterinarian)
  if (!isValid.success) {
    console.log(
      '🚀 ~ file: index.ts:12 ~ validateVeterinarian ~ !isValid.success:',
      isValid.success
    )
    throw isValid.issues
  }
}

export async function createVeterinarian({ input }: Props) {
  validateVeterinarian(input)
  const res = await fetch(`${siteConfig.url}/api/admin/veterinarians/create`, {
    body: JSON.stringify(input),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Failed to create veterinarian: ${res.statusText}`)
  }

  const veterinarian: IVeterinarian = await res.json()
  return veterinarian
}
