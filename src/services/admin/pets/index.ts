import { siteConfig } from '@/config/site'
import { PetSchema, IPet } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: IPet
}

function validatePet(pet: IPet) {
  const isValid = safeParse(PetSchema, pet)
  if (!isValid.success) {
    throw isValid.issues
  }
}

export async function createPet({ input }: Props) {
  validatePet(input)
  const res = await fetch(`${siteConfig.url}/api/admin/pets/`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to create pet: ${res.statusText}`)
  }

  const pet: IPet = await res.json()

  return pet
}

export async function deletePet({ id }: { id: string }) {
  const res = await fetch(`${siteConfig.url}/api/admin/pets/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Failed to pet deleted: ${res.statusText}`)
  }

  const ok: boolean = await res.json()
  return ok
}

// export async function updatePet({ input }: Props) {
//   validatePet(input)
//   const res = await fetch(`${siteConfig.url}/admin/pets/update`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const pet: IPet = await res.json()
//   return pet
// }
// export async function deletePet({ id }: { id: string }) {

//   const res = await fetch(`${siteConfig.url}/admin/pets/delete`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const pet: IPet = await res.json()
//   return pet
// }
