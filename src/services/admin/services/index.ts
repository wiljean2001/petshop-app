import { siteConfig } from '@/config/site'
import { ServiceSchema, IService } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: IService
}

function validateService(Service: IService) {
  const isValid = safeParse(ServiceSchema, Service)
  if (!isValid.success) {
    throw isValid.issues
  }
}

export async function createService({ input }: Props) {
  validateService(input)
  const res = await fetch(`${siteConfig.url}/api/admin/services/`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to create Service: ${res.statusText}`)
  }

  const Service: IService = await res.json()

  return Service
}

export async function deleteService({ id }: { id: string }) {
  const res = await fetch(`${siteConfig.url}/api/admin/services/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Failed to Service deleted: ${res.statusText}`)
  }

  const ok: boolean = await res.json()
  return ok
}

// export async function updateService({ input }: Props) {
//   validateService(input)
//   const res = await fetch(`${siteConfig.url}/admin/services/update`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const Service: IService = await res.json()
//   return Service
// }
// export async function deleteService({ id }: { id: string }) {

//   const res = await fetch(`${siteConfig.url}/admin/services/delete`, {
//     body: JSON.stringify(input),
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to create user: ${res.statusText}`)
//   }

//   const Service: IService = await res.json()
//   return Service
// }
