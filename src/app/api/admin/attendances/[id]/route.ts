import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { AttendanceSchema } from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

// Delete a attendance
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const attendance = await db.attendances.delete({
      where: { id: params.id },
    })

    if (!attendance) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a attendance
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const attendance = await db.attendances.findFirst({
      where: { id: params.id },
    })

    if (!attendance) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(attendance, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a attendances
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const newInput = exclude(input, ['appointment', 'createdAt', 'updatedAt'])
    if (newInput.date) {
      newInput.date = new Date(newInput.date)
    }
    const validated = safeParse(AttendanceSchema, newInput)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { date, appointmentId } = validated.output

    const attendances = await db.attendances.update({
      where: { id: params.id },
      data: {
        date,
        appointment: {
          connect: { id: appointmentId },
        },
      },
    })

    return SuccessResponse(attendances, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
