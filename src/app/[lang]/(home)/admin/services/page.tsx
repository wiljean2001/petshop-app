import { HeaderService } from '@/components/data-table-shell/services/header'
import { ServicesTableShell } from '@/components/data-table-shell/services/table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'
import { States_services } from '@prisma/client'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ServicePage({ searchParams }: Props) {
  const { page, per_page, sort, name, state } = searchParams
  console.log({
    name,
    state,
  })

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const statuses =
    typeof state === 'string'
      ? (state?.split('.') as States_services[]) ?? []
      : undefined

  const where = {
    name: typeof name === 'string' ? { contains: name } : undefined,
    state: typeof state === 'string' ? { in: statuses } : undefined,
  }

  const allService = db.service.findMany({
    select: {
      id: true,
      name: true,
      cost: true,
      description: true,
      duration: true,
      // image: true,
      state: true,
      ServiceDetails: true,
      ServiceAttentions: true,
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

  const totalService = db.service.count({ where })

  const result = await db.$transaction([allService, totalService])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Servicios'>
        <HeaderService />
      </DashboardHeader>
      {/* Table for show the service */}
      <ServicesTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
