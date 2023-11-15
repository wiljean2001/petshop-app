import { siteConfig } from '@/config/site'
import { VeterinarianSchema, IVeterinarian } from '@/models/schemas'
import { safeParse } from 'valibot'

interface Props {
  input: IVeterinarian
}

function validateVeterinarian(veterinarian: IVeterinarian) {
  const isValid = safeParse(VeterinarianSchema, veterinarian)
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
  const res = await fetch(`${siteConfig.url}/api/admin/veterinarians`, {
    body: JSON.stringify(input),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Fallo en el registro del veterinario: ${res.statusText}`)
  }

  const veterinarian: IVeterinarian = await res.json()
  return veterinarian
}

export async function deleteVeterinarian({ id }: { id: string }) {
  const res = await fetch(`${siteConfig.url}/api/admin/veterinarians/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error(
      `Fallo en la eliminación del veterinario: ${res.statusText}`
    )
  }

  const ok: boolean = await res.json()
  return ok
}

export async function updateVeterinarian({ input }: Props) {
  validateVeterinarian(input)
  const res = await fetch(
    `${siteConfig.url}/api/admin/veterinarians/${input.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(input),
      headers: { 'Content-Type': 'application/json' },
    }
  )

  if (!res.ok) {
    throw new Error(
      `Fallo en la actualización del veterinario: ${res.statusText}`
    )
  }

  const Veterinarian: IVeterinarian = await res.json()

  return Veterinarian
}
