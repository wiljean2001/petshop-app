import { siteConfig } from '@/config/site'
import { ClinicSchema, IClinic } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: IClinic
}

function validateClinic(clinic: IClinic) {
  const isValid = safeParse(ClinicSchema, clinic)
  if (!isValid.success) {
    console.log(
      '🚀 ~ file: index.ts:12 ~ validateClinic ~ !isValid.success:',
      isValid.success
    )
    throw isValid.issues
  }
}

export async function createClinic({ input }: Props) {
  validateClinic(input)
  const res = await fetch(`${siteConfig.url}/api/admin/clinics/create`, {
    body: JSON.stringify(input),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Failed to create clinic: ${res.statusText}`)
  }

  const clinic: IClinic = await res.json()
  return clinic
}

// export async function updateClinic({ input }: Props) {
//   validateClinic(input)
//   const res = await fetch(`${siteConfig.url}/admin/clinics/update`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const clinic: IClinic = await res.json()
//   return clinic
// }
// export async function deleteClinic({ id }: { id: string }) {

//   const res = await fetch(`${siteConfig.url}/admin/clinics/delete`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const clinic: IClinic = await res.json()
//   return clinic
// }
