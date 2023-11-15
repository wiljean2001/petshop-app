import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { ScheduleSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a schedule
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const schedule = await db.schedule.delete({
      where: { id: params.id },
    })

    if (!schedule) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a schedule
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const schedule = await db.schedule.findFirst({
      where: { id: params.id },
    })

    if (!schedule) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(schedule, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a schedule
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const newInput = exclude(input, ['createdAt', 'updatedAt'])
    const validated = safeParse(ScheduleSchema, newInput)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { day_week, closingHour, openingHour } = validated.output

    const schedule = await db.schedule.update({
      where: { id: params.id },
      data: { day_week, closingHour, openingHour },
    })

    return SuccessResponse(schedule, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
