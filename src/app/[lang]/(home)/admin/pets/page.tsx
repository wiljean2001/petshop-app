import { HeaderPet } from '@/components/data-table-shell/pets/header'
import LoadPetTableShell from '@/components/data-table-shell/pets/load-table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'
import { parseSortParameter } from '@/lib/utils'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PetPage({ searchParams }: Props) {
  const { page, per_page, sort, name } = searchParams

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    name: typeof name === 'string' ? { contains: name } : undefined,
  }

  const orderBy =
    sort && typeof sort === 'string'
      ? parseSortParameter(sort)
      : { createdAt: 'desc' }

  const allPet = db.pet.findMany({
    select: {
      id: true,
      name: true,
      birthdate: true,
      gender: true,
      color: true,
      derivedFrom: true,
      medicalNotes: true,
      breedId: true,
      ownerId: true,
      owner: true,
      breed: true,
      Appointments: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy,
    where,
  })

  const totalPet = db.pet.count({ where })

  const result = await db.$transaction([allPet, totalPet])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Mascotas'>
        <HeaderPet />
      </DashboardHeader>
      {/* Table for show the pet */}
      <LoadPetTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
