import { CardCalendarAppointments } from '@/components/calendar/appointments-calendar/card-calendar-appointments'
import FilterAppointment from '@/components/filters/filter-appointment'
import { DashboardHeader } from '@/components/layout/auth/header'
import { HeaderAppointment } from '@/components/data-table-shell/appointments/header'
import { db } from '@/lib/prisma'
import { AppointmentStatusKey } from '@/config/const'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AppointmentPage({ searchParams }: Props) {
  const {
    page,
    per_page,
    clinic,
    veterinarian,
    pet,
    date,
    appointmentStatus,
    owner,
  } = searchParams // filters, page and sorts

  console.log(
    '🚀 ~ file: page.tsx:16 ~ AppointmentPage ~ clinic, veterinarian, pet, date, appointmentStatus:',
    clinic,
    veterinarian,
    pet,
    date,
    appointmentStatus,
    owner
  )
  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const twoDaysAgo = () => {
    var d = new Date()
    d.setDate(d.getDate() - 2)
    return d
  }

  const where = {
    veterinarian: {
      clinic: {
        id: typeof clinic === 'string' ? clinic : undefined,
      },
      id: typeof veterinarian === 'string' ? veterinarian : undefined,
    },
    pet: {
      owner: {
        id: typeof owner === 'string' ? owner : undefined,
      },
      id: typeof pet === 'string' ? pet : undefined,
    },
    scheduledDateTime:
      typeof date === 'string'
        ? {
            gte: new Date(date.split(',')[0]), // Fecha inicio
            lte: new Date(date.split(',')[1]), // Fecha inicio
          }
        : {
            gte: twoDaysAgo(), // Fecha inicio
          },
    status:
      typeof appointmentStatus === 'string'
        ? (appointmentStatus as AppointmentStatusKey)
        : undefined,
  }

  const allAppointments = db.appointments.findMany({
    select: {
      id: true,
      status: true,
      scheduledDateTime: true,
      pet: {
        select: {
          name: true, // name pet
          breed: {
            select: {
              name: true, // breed
              specie: {
                select: { name: true },
              },
            },
          },
          owner: {
            select: {
              name: true, // name owner
              surname: true, // surname owner
            },
          },
        },
      },
    },
    skip,
    take,
    where,
  })

  const totalAppointments = db.appointments.count({ where })

  const result = await db.$transaction([allAppointments, totalAppointments])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and form of create new appointment with date validated*/}
      <DashboardHeader heading='Citas'>
        <HeaderAppointment />
      </DashboardHeader>
      {/* <AppointmentHeader /> */}
      {/* advance filter for show appointments / For default the appointment dates range is one mouth */}
      <FilterAppointment />

      {/* List alt appointments */}
      <CardCalendarAppointments
        appointments={result[0]}
        pageCount={pageCount}
      />
    </>
  )
}
