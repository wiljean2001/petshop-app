import ButtonEndAttendance from '@/components/data-table-shell/appointments/in_process/button-end-attendance'
import FirstContentPage from '@/components/data-table-shell/appointments/in_process/first-content-page'
import SecondContentPage from '@/components/data-table-shell/appointments/in_process/second-content-page'
import ThirdContentPage from '@/components/data-table-shell/appointments/in_process/third-content-page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/lib/prisma'
// import { utcToZonedTime } from 'date-fns-tz'
import { redirect } from 'next/navigation'
import moment from 'moment-timezone'
import { getTimezoneOffset, utcToZonedTime, toDate, format } from 'date-fns-tz'
import { IAttendance } from '@/models/schemas'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AppointmentInProcessPage({
  searchParams,
}: Props) {
  const { appointment } = searchParams

  if (!appointment || typeof appointment !== 'string') {
    // showToast('Cita en proceso es requerida', 'warning')
    redirect('/admin/appointments/')
  }

  const getAppointment = db.appointments.findFirst({
    where: { id: appointment },
    select: {
      id: true,
      status: true,
      scheduledDateTime: true,
      beginningDateTime: true,
      ServiceAppointments: {
        select: {
          id: true,
          cost: true,
          details: true,
          serviceId: true,
          clinicalData: true,
        },
      },
      Attendances: {
        select: {
          Diagnostics: true,
          Prescription: {
            select: {
              id: true,
              instructions: true,
              prescribedItem: true,
            },
          },
        },
      },
      petId: true,
      pet: {
        select: {
          id: true,
          name: true,
        },
      },
      vetId: true,
      veterinarian: {
        select: {
          id: true,
          name: true,
          surname: true,
          specialty: true,
        },
      },
    },
  })

  const totalServices = db.serviceAppointments.count({
    where: {
      appointmentId: appointment,
    },
  })

  const result = await db.$transaction([getAppointment, totalServices])

  // Redirect to other pages when appointment is not valid
  if ((!result[0] && result[1] <= 0) || result[0]?.status !== 'IN_PROCESS') {
    redirect('/admin/appointments/')
  }

  let attendance = null
  if (result[0].beginningDateTime === null) {
    // Time Zone medicated for initialize the appointment
    const timeZone = '-10:00'
    const nowInLima = utcToZonedTime(new Date(), timeZone)
    console.log('🚀 ~ file: page.tsx:91 ~ nowInLima:', nowInLima)

    // update the start datetime of appointment
    await db.appointments.update({
      where: {
        id: result[0].id,
      },
      data: {
        beginningDateTime: nowInLima,
      },
    })
    // And create an attendance
    attendance = (await db.attendances.create({
      data: {
        date: nowInLima,
        appointment: {
          connect: {
            id: appointment,
          },
        },
      },
    })) as IAttendance
    console.log('🚀 ~ attendance -> if:', attendance)
  } else {
    // Get attendance when appointmentId === appointment
    attendance = (await db.attendances.findFirst({
      where: { appointmentId: appointment },
    })) as IAttendance
    console.log('🚀 ~ attendance -> else:', attendance)
  }

  if (attendance === null || attendance === undefined) {
    redirect('/admin/appointments/in_process?' + appointment) // refresh the page
  }

  return (
    <Tabs defaultValue='attendance' className='w-full'>
      <TabsList className='grid w-full grid-cols-6'>
        <TabsTrigger value='attendance'>Atención</TabsTrigger>
        <TabsTrigger value='diagnostics'>Diagnóstico</TabsTrigger>
        <TabsTrigger value='prescription'>Receta</TabsTrigger>
        <div className='col-span-2'></div>
        <ButtonEndAttendance apointmentId={appointment} />
      </TabsList>
      <TabsContent value='attendance'>
        <FirstContentPage
          totalServices={result[1]}
          appointment={result[0] as any}
        />
      </TabsContent>
      <TabsContent value='diagnostics'>
        {attendance !== null && (
          <SecondContentPage
            appointment={result[0] as any}
            attendance={attendance}
          />
        )}
      </TabsContent>
      <TabsContent value='prescription'>
        {attendance !== null && (
          <ThirdContentPage
            appointment={result[0] as any}
            attendance={attendance}
          />
        )}
      </TabsContent>
    </Tabs>
  )
}
