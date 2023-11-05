import { HeaderSpecie } from '@/components/data-table-shell/species/header'
import { SpeciesTableShell } from '@/components/data-table-shell/species/table-shell'
import { db } from '@/lib/prisma'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Specie({ searchParams }: Props) {
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

  const allSpecie = db.specie.findMany({
    select: {
      id: true,
      name: true,
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

  const totalSpecie = db.specie.count({ where })

  const result = await db.$transaction([allSpecie, totalSpecie])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <HeaderSpecie />

      {/* Table for show the Specie */}
      <SpeciesTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
