import { siteConfig } from '@/config/site'
import { BreedSchema, IBreed } from '@/models/schemas.d'
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
    throw new Error(`Fallo en la obtención de las razas: ${res.statusText}`)
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
    throw new Error(`Fallo en la creación de la raza: ${res.statusText}`)
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
    throw new Error(`Fallo en la elimiación de la raza: ${res.statusText}`)
  }

  const ok: boolean = await res.json()
  return ok
}

export async function updateBreed({ input }: Props) {
  validateBreed(input)
  const res = await fetch(`${siteConfig.url}/api/admin/breeds/${input.id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Fallo en la editar la raza: ${res.statusText}`)
  }

  const breed: IBreed = await res.json() // updated breed

  return breed
}
