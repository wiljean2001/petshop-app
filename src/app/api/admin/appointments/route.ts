import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { AppointmentWithServiceSchema } from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

// List all clinics
export async function GET() {
  const clinics = await db.appointments.findMany()
  return SuccessResponse(clinics, 200)
}

// Create a nuew appointments
export async function POST(req: NextRequest) {
  const input = await req.json()

  if (input.scheduledDateTime) {
    input.scheduledDateTime = new Date(input.scheduledDateTime)
  }

  const validated = safeParse(AppointmentWithServiceSchema, input)

  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { status, petId, vetId, scheduledDateTime, services } = validated.output
  console.log('🚀 ~ file: route.ts:28 ~ POST ~ validated.output:', validated.output)

  try {
    const appointments = await db.appointments.create({
      data: {
        status,
        scheduledDateTime,
        veterinarian: {
          connect: { id: vetId },
        },
        pet: {
          connect: { id: petId },
        },
        ServiceAppointments: {
          createMany: {
            data: services.map(
              ({ cost, details, serviceId }) => ({
                date: scheduledDateTime,
                cost,
                details,
                serviceId,
              })
            ),
          },
        },
      },
    })
    return SuccessResponse(appointments, 200)
  } catch (error) {
    console.log('🚀 ~ file: route.ts:57 ~ POST ~ error:', error)
    return ErrorResponse('BAD_REQUEST')
  }
}
