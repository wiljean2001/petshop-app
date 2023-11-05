import { HeaderPet } from '@/components/data-table-shell/pets/header'
import { PetsTableShell } from '@/components/data-table-shell/pets/table-shell'
import { db } from '@/lib/prisma'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PetPage({ searchParams }: Props) {
  const { page, per_page, sort, name } = searchParams
  console.log({
    name,
  })

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    name: typeof name === 'string' ? { contains: name } : undefined,
  }

  const allPet = db.pet.findMany({
    select: {
      id: true,
      name: true,
      birthdate: true,
      gender: true,
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
    orderBy:
      typeof sort === 'string'
        ? { [sort.split('.')[0]]: sort.split('.')[1] }
        : { id: 'desc' },
    where,
  })

  const totalPet = db.pet.count({ where })

  const result = await db.$transaction([allPet, totalPet])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <HeaderPet />
      {/* Table for show the pet */}
      <PetsTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
