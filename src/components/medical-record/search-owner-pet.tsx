'use client'
import { SearchPetByOwner } from '@/services/admin/medical-record/pets'
import { IOwnerFilter, IPetFilter } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchOwnerPet() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('')
  const [owners, setOwners] = useState<IOwnerFilter[]>([])

  const [selectedOwner, selectOwner] = useState<IOwnerFilter | undefined>()

  const [selectedPet, selectPet] = useState<IPetFilter | undefined>()

  const selectedPetId = searchParams?.get('petId') || ''

  const [searching, setSearching] = useState(false)

  const searchOwner = async () => {
    if(searching) return
    setSearching(true)
    selectOwner(undefined)
    const res = await SearchPetByOwner({ term: searchTerm })
    setOwners(res)
    setSearching(false)
  }

  //   useEffect(() => {
  //     if (selectedPet) {
  //     }
  //   }, [selectedPet])

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )
  useEffect(() => {
    if (selectedPet) {
      router.push(
        `${pathname}?${createQueryString({
          selectedPetId,
        })}`
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='container mx-auto p-4 '>
      <div className='flex flex-col md:flex-row md:items-center gap-4 mb-1'>
        <Input
          className='flex-grow'
          type='text'
          placeholder='Buscar propietarios...'
          value={searchTerm}
          disabled={searching}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={searchOwner}>Buscar</Button>
      </div>
      {owners.length > 0 && (
        <div className='mb-2'>
          <h3 className='font-semibold text-lg mb-1'>Dueños:</h3>
          <div className='flex flex-wrap gap-2'>
            {owners.map((owner) => (
              <Badge
                key={owner.id}
                onClick={() => selectOwner(owner)}
                className='cursor-pointer'
                variant={
                  selectedOwner?.id === owner.id ? 'destructive' : 'default'
                }
              >
                {owner.name} {owner.surname}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {selectedOwner && (
        <div>
          <h3 className='font-semibold text-lg mb-1'>
            Mascotas de {selectedOwner.name}:
          </h3>
          <div className='flex flex-wrap gap-2'>
            {selectedOwner?.Pet.map((pet) => (
              <Badge
                key={pet.id}
                onClick={() => {
                  selectPet(pet)
                  const queryString = createQueryString({
                    petId: selectedPet!.id,
                  })
                  router.push(`${pathname}?${queryString}`, { scroll: true })
                }}
                className='cursor-pointer'
                variant={selectedPet?.id === pet.id ? 'destructive' : 'default'}
              >
                {pet.name} - {pet.breed.name} - {pet.breed.specie?.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
