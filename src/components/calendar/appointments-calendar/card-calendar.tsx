import { cn } from '@/lib/utils'
import { Pagination } from '../calendar-pagination'
import {
  APPOINTMENTSTATUSTRANSLATIONS,
  type AppointmentStatusKey,
} from '@/config/const'
import Link from 'next/link'
import { Appointments } from '@/models/schemas.d'
import { getDateToString } from '@/lib/times'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { showToast } from '@/helpers/toast'
import { useCallback, useEffect, useState } from 'react'

import { utcToZonedTime } from 'date-fns-tz'
import { differenceInMinutes, isBefore } from 'date-fns'
import { useRouter } from 'next/navigation'
import {
  cancelAppointment,
  updateStateSchedule,
} from '@/services/admin/appointments'
import { UpdateAppointment } from '@/components/data-table-shell/appointments/update'

// const timeZone = 'UTC -5'
const timeZone = 'America/Lima'

interface CardCalendarProps {
  appointments: Appointments[]
  onPageChange: (page: number) => void
  currentPage: number
  totalPages: number
}
export const CardCalendar = ({
  appointments,
  onPageChange,
  currentPage,
  totalPages,
}: CardCalendarProps) => {
  const router = useRouter()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [appointmentId, setAppointmentId] = useState<string | undefined>(
    undefined
  )

  const checkAndUpdateAppointments = useCallback(async () => {
    // const now = new Date()
    const now = utcToZonedTime(new Date(), timeZone)

    appointments.forEach(async (appointment) => {
      if (
        appointment.status === 'CANCELED' ||
        appointment.status === 'COMPLETED' ||
        appointment.status === 'IN_PROCESS' ||
        appointment.status === 'NO_SHOW'
      ) {
        return
      }

      const scheduledTime = utcToZonedTime(
        new Date(appointment.scheduledDateTime),
        timeZone
      )
      if (
        differenceInMinutes(scheduledTime, now) <= 5 &&
        isBefore(now, scheduledTime)
      ) {
        // Notificar y cambiar el estado
        showToast(
          `La cita con ${appointment.pet.name} está a punto de comenzar.`,
          'warning'
        )
        try {
          updateStateSchedule(appointment.id, 'IN_PROCESS').then((res) => {
            if (res) {
              router.refresh()
            }
          })
        } catch (error) {
          showToast('Ocurrió un error al inciiar la cita', 'error')
        }
      }
    })
  }, [appointments, router])

  useEffect(() => {
    const interval = setInterval(checkAndUpdateAppointments, 30000) // 60000 ms = .5 minuto
    return () => clearInterval(interval)
  }, [appointments, checkAndUpdateAppointments])

  /**
   *
   * @param appointments - Appointment for render all characteristics
   * @returns jsx
   */
  const AppointmentCard = ({ appointment }: { appointment: Appointments }) => {
    const date = getDateToString({
      date: appointment.scheduledDateTime,
    })

    const handleCancelAppointment = () => {
      showToast(
        '¿Está seguro de cancelar la cita?. Confirmar acción.',
        'warning',
        () => {
          try {
            cancelAppointment(appointment.id).then(() => {
              router.refresh()
            })
          } catch (error) {}
        }
      )
    }
    const handleForceAppointment = () => {
      showToast(
        '¿Está seguro de adelantar la cita programada?. Confirmar acción.',
        'warning',
        () => {
          try {
            updateStateSchedule(appointment.id, 'IN_PROCESS').then(() => {
              router.refresh()
            })
          } catch (error) {}
        }
      )
    }

    const handleEditAppointment = () => {
      showToast(
        '¿Está seguro de actualizar la cita?. Confirmar acción.',
        'warning',
        () => {
          setAppointmentId(appointment.id)
          setDialogOpen(true)
        }
      )
    }
    const appointmentState = appointment.status as AppointmentStatusKey
    return (
      <div className='flex flex-col border border-gray-200 rounded-3xl'>
        {/* Header */}
        <div
          className={cn(
            'text-lg p-2 rounded-t-3xl text-center bg-secondary text-balance'
            // nowDate !== appointment.date
          )}
        >
          {date.components?.weekdayLong} {date.components?.day}
          {' / '}
          {date.components?.mouthShort}
        </div>
        {/* Container */}
        <div className='flex flex-col text-center items-center justify-between p-4 h-[28rem]'>
          <div className='flex flex-col'>
            <span className='font-semibold'>{appointment.pet.name}</span>
            <span>{appointment.pet.breed.name}</span>
          </div>
          <div className='flex rounded-full w-32 h-32 bg-primary/50 justify-center items-center'>
            <span className='text-3xl'>
              {date.components?.hour}:{date.components?.minute}
            </span>
          </div>
          <div className='flex flex-col text-balance'>
            <span>
              {appointment.pet.owner.name} {appointment.pet.owner.surname}
            </span>
          </div>
          <div className='text-primary font-semibold'>
            {appointmentState === 'PENDING' && (
              <span>{APPOINTMENTSTATUSTRANSLATIONS['PENDING']}</span>
            )}
            {appointmentState === 'CONFIRMED' && (
              <span>{APPOINTMENTSTATUSTRANSLATIONS['CONFIRMED']}</span>
            )}
            {appointmentState === 'IN_PROCESS' && (
              <Link
                // className='bg-secondary text-white px-4 py-2 rounded-lg'
                className={buttonVariants({
                  variant: 'default',
                })}
                href={`/es/admin/appointments/in_process?appointment=${appointment.id}`}
              >
                Iniciar atención
              </Link>
            )}
            {appointmentState === 'COMPLETED' && (
              <span className='text-green-600'>
                {APPOINTMENTSTATUSTRANSLATIONS['COMPLETED']}
              </span>
            )}
            {appointmentState === 'CANCELED' && (
              <span className='text-destructive'>
                {APPOINTMENTSTATUSTRANSLATIONS['CANCELED']}
              </span>
            )}
            {appointmentState === 'NO_SHOW' && (
              <span className='text-destructive'>
                {APPOINTMENTSTATUSTRANSLATIONS['NO_SHOW']}
              </span>
            )}
          </div>
          <div className='text-balance'>
            <span>{date.formattedDate}</span>
          </div>
          <div className='flex gap-2'>
            {/* Cancel appointment */}
            {(appointmentState === 'PENDING' ||
              appointmentState === 'CONFIRMED') && (
              <>
                <Button onClick={() => handleCancelAppointment()}>
                  <Icons.trashIcon className='w-4' />
                  <span className='sr-only'>Cancelar cita</span>
                </Button>
                {/* Edit appointment (only init date and update to confirm appointment when is pending now) */}
                <Button onClick={() => handleEditAppointment()}>
                  <Icons.pencilIcon className='w-4' />
                  <span className='sr-only'>Editar cita</span>
                </Button>

                {/* Force init the appointment */}
                <Button
                  variant={'destructive'}
                  onClick={() => handleForceAppointment()}
                >
                  <Icons.playIcon className='w-4' />
                  <span className='sr-only'>Iniciar cita</span>
                </Button>
              </>
            )}

            {/* {(appointment.status as AppointmentStatusKey) !== 'IN_PROCESS' && (
              
            )} */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className='container mx-auto p-4'>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
          {appointments.map((appointment, index) => (
            <AppointmentCard
              key={index + '_' + appointment.pet.name}
              appointment={appointment}
            />
          ))}
        </div>
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      {appointmentId && (
        <UpdateAppointment
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          appointmentId={appointmentId}
        />
      )}
    </>
  )
}
