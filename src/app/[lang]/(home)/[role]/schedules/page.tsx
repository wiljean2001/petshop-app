import { HeaderSchedule } from '@/components/data-table-shell/schedules/header-schedule'
import { ScheduleTableShell } from '@/components/data-table-shell/schedules/schedules-table-shell'
import { db } from '@/lib/prisma'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SchedulesPage({ searchParams }: Props) {
  const { page, per_page, sort, title, status, priority } = searchParams
  console.log({
    title,
    status,
    priority,
  })

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    day_week: typeof title === 'string' ? { contains: title } : undefined,
  }

  const allSchedule = db.schedule.findMany({
    select: {
      id: true,
      day_week: true,
      closingHour: true,
      openingHour: true,
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

  const totalClinics = db.schedule.count({ where })

  const result = await db.$transaction([allSchedule, totalClinics])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <HeaderSchedule />
      {/* Table for show the schedules */}
      <ScheduleTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
