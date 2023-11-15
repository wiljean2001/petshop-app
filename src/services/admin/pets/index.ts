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
    throw new Error(
      `Fallo en la actualización creación de la mascota: ${res.statusText}`
    )
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
    throw new Error(
      `Fallo en la actualización eliminación de la mascota: ${res.statusText}`
    )
  }

  const ok: boolean = await res.json()
  return ok
}

export async function updatePet({ input }: Props) {
  validatePet(input)
  const res = await fetch(`${siteConfig.url}/api/admin/pets/${input.id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(
      `Fallo en la actualización actualización de la mascota: ${res.statusText}`
    )
  }

  const pet: IPet = await res.json()

  return pet
}
