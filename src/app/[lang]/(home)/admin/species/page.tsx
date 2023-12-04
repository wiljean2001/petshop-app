import { HeaderSpecie } from '@/components/data-table-shell/species/header'
import LoadSpecieTableShell from '@/components/data-table-shell/species/load-table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'
import { parseSortParameter } from '@/lib/utils'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Specie({ searchParams }: Props) {
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

  const allSpecie = db.specie.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy,
    where,
  })

  const totalSpecie = db.specie.count({ where })

  const result = await db.$transaction([allSpecie, totalSpecie])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Especies'>
        <HeaderSpecie />
      </DashboardHeader>
      {/* Table for show the Specie */}
      <LoadSpecieTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
