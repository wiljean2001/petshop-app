import { siteConfig } from '@/config/site'
import { OwnerSchema, IOwner } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: IOwner
}

function validateOwner(owner: IOwner) {
  const isValid = safeParse(OwnerSchema, owner)
  if (!isValid.success) {
    throw isValid.issues
  }
}

export async function getOwners() {
  const res = await fetch(`${siteConfig.url}/api/admin/owners/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Fallo en la _ del propietario: ${res.statusText}`)
  }

  const owners: IOwner[] = await res.json()

  return owners
}

export async function createOwner({ input }: Props) {
  validateOwner(input)
  const res = await fetch(`${siteConfig.url}/api/admin/owners/`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Fallo en la creación del propietario: ${res.statusText}`)
  }

  const owner: IOwner = await res.json()

  return owner
}

export async function deleteOwner({ id }: { id: string }) {
  const res = await fetch(`${siteConfig.url}/api/admin/owners/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(
      `Fallo en la eliminación del propietario: ${res.statusText}`
    )
  }

  const ok: boolean = await res.json()
  return ok
}

export async function updateOwner({ input }: Props) {
  validateOwner(input)
  const res = await fetch(`${siteConfig.url}/api/admin/owners/${input.id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(
      `Fallo en la actualización del propietario: ${res.statusText}`
    )
  }

  const owner: IOwner = await res.json()

  return owner
}
