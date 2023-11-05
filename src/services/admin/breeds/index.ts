import { siteConfig } from '@/config/site'
import { BreedSchema, IBreed } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: IBreed
}

function validateBreed(breed: IBreed) {
  const isValid = safeParse(BreedSchema, breed)
  if (!isValid.success) {
    throw isValid.issues
  }
}

export async function getBreeds() {
  const res = await fetch(`${siteConfig.url}/api/admin/breeds/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to get breeds: ${res.statusText}`)
  }

  const specie: IBreed[] = await res.json()

  return specie
}

export async function createBreed({ input }: Props) {
  validateBreed(input)
  const res = await fetch(`${siteConfig.url}/api/admin/breeds/`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to create breed: ${res.statusText}`)
  }

  const breed: IBreed = await res.json()

  return breed
}

export async function deleteBreed({ id }: { id: string }) {
  const res = await fetch(`${siteConfig.url}/api/admin/breeds/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Failed to breed deleted: ${res.statusText}`)
  }

  const ok: boolean = await res.json()
  return ok
}

// export async function updateBreed({ input }: Props) {
//   validateBreed(input)
//   const res = await fetch(`${siteConfig.url}/admin/breeds/update`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const breed: IBreed = await res.json()
//   return breed
// }
// export async function deleteBreed({ id }: { id: string }) {

//   const res = await fetch(`${siteConfig.url}/admin/breeds/delete`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const breed: IBreed = await res.json()
//   return breed
// }
