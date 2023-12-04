import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { AppointmentWithServiceSchema } from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

// Create a nuew appointments
export async function POST(req: NextRequest) {
  const input = await req.json()

  try {
    const clinic = await db.$transaction(async (prisma) => {
      const appointments = await prisma.appointments.update({
        where: { id: input },
        data: {
          status: 'COMPLETED',
        },
      })

      return appointments
    })

    return SuccessResponse(clinic, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
