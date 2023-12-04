import { db } from '@/lib/prisma'
import { HeaderBreed } from '@/components/data-table-shell/breeds/header'
import { DashboardHeader } from '@/components/layout/auth/header'
import { parseSortParameter } from '@/lib/utils'
import LoadBreedTableShell from '@/components/data-table-shell/breeds/load-table-shell'
// import { BreedsTableShell } from '@/components/data-table-shell/breeds/table-shell'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function BreedsPage({ searchParams }: Props) {
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

  const allBreeds = db.breed.findMany({
    select: {
      id: true,
      name: true,
      specieId: true,
      specie: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy,
    where,
  })

  const totalClinics = db.breed.count({ where })

  const result = await db.$transaction([allBreeds, totalClinics])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Razas'>
        <HeaderBreed />
      </DashboardHeader>

      {/* Table for show the clinics */}

      <LoadBreedTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
