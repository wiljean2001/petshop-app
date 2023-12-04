import { HeaderOwner } from '@/components/data-table-shell/owners/header'
import LoadOwnerTableShell from '@/components/data-table-shell/owners/load-table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'
import { parseSortParameter } from '@/lib/utils'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OwnerPage({ searchParams }: Props) {
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

  const allOwner = db.owner.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
      city: true,
      phone: true,
      address: true,
      email: true,
      // Pet: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy,
    where,
  })

  const totalOwner = db.owner.count({ where })

  const result = await db.$transaction([allOwner, totalOwner])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Propietarios'>
        <HeaderOwner />
      </DashboardHeader>

      {/* Table for show the Owner */}
      <LoadOwnerTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
