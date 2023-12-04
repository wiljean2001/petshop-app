import { AppointmentStatusKey } from '@/config/const'
import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import {
  AppointmentOnlyUpdateSchema,
  IAppointmentOnlyUpdate,
} from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

// Delete a appointments
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointments = await db.appointments.delete({
      where: { id: params.id },
    })

    if (!appointments) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a appointments
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = req.nextUrl.searchParams
  const withClinic = searchParams.get('withClinic') || undefined
  try {
    const appointment = await db.appointments.findFirst({
      where: { id: params.id },
      select: {
        id: true,
        scheduledDateTime: true,
        status: true,
        veterinarian: {
          select: {
            clinicId: true,
          },
        },
      },
    })

    if (!appointment) return ErrorResponse('NOT_FOUND')

    if (withClinic && appointment.veterinarian) {
      const clinicId = await db.clinic.findUnique({
        where: { id: appointment.veterinarian.clinicId },
      })
      return SuccessResponse(
        {
          clinicId: clinicId?.id,
          status: appointment.status,
          scheduledDateTime: appointment.scheduledDateTime,
          id: appointment.id,
        } as IAppointmentOnlyUpdate,
        200
      )
    }

    return SuccessResponse(appointments, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a appointments
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const input = await req.json()
    // const newInput = exclude(input, [
    //   'pet',
    //   'veterinarian',
    //   'createdAt',
    //   'updatedAt',
    // ])

    // When update only the state of appointment
    if (typeof input === 'string') {
      const appointments = await db.appointments.update({
        where: { id: params.id },
        data: {
          status: input as AppointmentStatusKey,
        },
      })
      return SuccessResponse(appointments, 200)
    }

    // When update the state and date of appointment
    if (input.scheduledDateTime) {
      input.scheduledDateTime = new Date(input.scheduledDateTime)
    }
    const validated = safeParse(AppointmentOnlyUpdateSchema, input)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { status, scheduledDateTime } = validated.output

    const appointments = await db.appointments.update({
      where: { id: params.id },
      data: {
        status,
        scheduledDateTime,
      },
    })

    return SuccessResponse(appointments, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
