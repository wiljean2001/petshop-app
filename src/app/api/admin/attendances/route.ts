import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { AttendanceSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all clinics
export async function GET() {
  const clinics = await db.attendances.findMany()
  return SuccessResponse(clinics, 200)
}

// Create a nuew attendances
export async function POST(req: Request) {
  const input = await req.json()
  const validated = safeParse(AttendanceSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }


  const { date, appointmentId } = validated.output

  // If date is valid with appointment
  try {
    const attendances = await db.attendances.create({
      data: {
        date,
        appointment: {
          connect: { id: appointmentId },
        },
      },
    })

    return SuccessResponse(attendances, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
