import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { AppointmentSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all clinics
export async function GET() {
  const clinics = await db.appointments.findMany()
  return SuccessResponse(clinics, 200)
}

// Create a nuew appointments
export async function POST(req: Request) {
  const input = await req.json()
  const validated = safeParse(AppointmentSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { status, petId, vetId, dateTime } = validated.output

  try {
    const appointments = await db.appointments.create({
      data: {
        status,
        dateTime,
        veterinarian: {
          connect: { id: vetId },
        },
        pet: {
          connect: { id: petId },
        },
      },
    })

    return SuccessResponse(appointments, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
