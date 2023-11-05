import { siteConfig } from '@/config/site'
import { SpecieSchema, ISpecie } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: ISpecie
}

function validateSpecie(specie: ISpecie) {
  const isValid = safeParse(SpecieSchema, specie)
  if (!isValid.success) {
    throw isValid.issues
  }
}

export async function getSpecies() {
  const res = await fetch(`${siteConfig.url}/api/admin/species/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to get species: ${res.statusText}`)
  }

  const specie: ISpecie[] = await res.json()

  return specie
}
export async function createSpecie({ input }: Props) {
  validateSpecie(input)
  const res = await fetch(`${siteConfig.url}/api/admin/species/`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to create specie: ${res.statusText}`)
  }

  const specie: ISpecie = await res.json()

  return specie
}

export async function deleteSpecie({ id }: { id: string }) {
  const res = await fetch(`${siteConfig.url}/api/admin/species/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Failed to specie deleted: ${res.statusText}`)
  }

  const ok: boolean = await res.json()
  return ok
}

// export async function updateSpecie({ input }: Props) {
//   validateSpecie(input)
//   const res = await fetch(`${siteConfig.url}/admin/species/update`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const specie: ISpecie = await res.json()
//   return specie
// }
// export async function deleteSpecie({ id }: { id: string }) {

//   const res = await fetch(`${siteConfig.url}/admin/species/delete`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const specie: ISpecie = await res.json()
//   return specie
// }
