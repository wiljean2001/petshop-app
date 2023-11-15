import { db } from '@/lib/prisma'
import { HeaderAppointment } from '@/components/data-table-shell/appointments/header'
// import { AppointmentTableShell } from '@/components/data-table-shell/appointments/table-shell'
import { Suspense } from 'react'
import { DataTableLoading } from '@/components/data-table/data-table-loading'
import { DashboardHeader } from '@/components/layout/auth/header'
import { MyCalendar } from '@/components/big-calendar'
export interface Event {
  title: string
  start: Date
  end: Date
}

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AppointmentPage({ searchParams }: Props) {
  const { page, per_page, sort, dateTime } = searchParams
  console.log({
    dateTime,
  })

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    dateTime: typeof dateTime === 'string' ? { contains: dateTime } : undefined,
  }

  const allAppointment = db.appointments.findMany({
    select: {
      id: true,
      dateTime: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy:
      typeof sort === 'string'
        ? { [sort.split('.')[0]]: sort.split('.')[1] }
        : { id: 'desc' },
    // where,
  })

  // const totalClinics = db.appointments.count({ where })

  // const result = await db.$transaction([allAppointment, totalClinics])

  // const pageCount = Math.ceil(result[1] / limit)

  const events: Event[] = [
    {
      title: 'Cita con Charlie',
      start: new Date(2023, 11, 0, 10, 0), // Año, Mes (0-index), Día, Hora, Minutos
      end: new Date(2023, 11, 0, 11, 0),
    },
    // ... más eventos
  ]

  return (
    <>
      {/* Title and form of create new appointment with date validated*/}
      <DashboardHeader heading='Citas'>
        <HeaderAppointment />
      </DashboardHeader>

      {/* Table for show the clinics */}
      <MyCalendar events={events} />
      {/* <AppointmentTableShell data={result[0]} pageCount={pageCount} /> */}
    </>
  )
}

// toolkit.fymconsulting
