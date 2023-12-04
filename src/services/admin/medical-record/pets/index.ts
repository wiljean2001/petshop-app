import { siteConfig } from '@/config/site'
import { IOwnerFilter } from '@/types'

export const SearchPetByOwner = async ({ term }: { term: string }) => {
  const res = await fetch(
    `${siteConfig.url}/api/admin/owners/filter?searchTerm=${term}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
  if (!res.ok) {
    throw new Error(`Fallo en la creación de la clinica: ${res.statusText}`)
  }

  const filter: IOwnerFilter[] = await res.json()
  return filter
}
