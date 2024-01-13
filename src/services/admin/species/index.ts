import { siteConfig } from '@/config/site'
import { SpecieSchema, ISpecie } from '@/models/schemas.d'
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
    throw new Error(`Fallo en la obtención de las especies: ${res.statusText}`)
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
    throw new Error(`Fallo en la creación de la especie: ${res.statusText}`)
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
    throw new Error(`Fallo en la eliminación de la especie: ${res.statusText}`)
  }

  const ok: boolean = await res.json()
  return ok
}

export async function updateSpecie({ input }: Props) {
  validateSpecie(input)
  const res = await fetch(`${siteConfig.url}/api/admin/species/${input.id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(
      `Fallo en la actualización de la especie: ${res.statusText}`
    )
  }

  const specie: ISpecie = await res.json()

  return specie
}
