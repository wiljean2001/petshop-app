import { HeaderSchedule } from '@/components/data-table-shell/schedules/header'
import LoadScheduleTableShell from '@/components/data-table-shell/schedules/load-table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'
import { parseSortParameter } from '@/lib/utils'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SchedulesPage({ searchParams }: Props) {
  const { page, per_page, sort, title, status, priority } = searchParams

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    dayWeek: typeof title === 'string' ? { contains: title } : undefined,
  }

  const orderBy =
    sort && typeof sort === 'string'
      ? parseSortParameter(sort)
      : { createdAt: 'desc' }

  const allSchedule = db.schedule.findMany({
    select: {
      id: true,
      dayWeek: true,
      closingHour: true,
      openingHour: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy,
    where,
  })

  const totalClinics = db.schedule.count({ where })

  const result = await db.$transaction([allSchedule, totalClinics])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Horarios'>
        <HeaderSchedule />
      </DashboardHeader>
      {/* Table for show the schedules */}
      <LoadScheduleTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
