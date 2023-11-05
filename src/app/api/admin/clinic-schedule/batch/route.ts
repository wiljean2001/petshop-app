import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'

// insert
export async function POST(req: Request) {
  try {
    const input = await req.json()

    if (
      input &&
      Array.isArray(input) &&
      input.every(
        ({ clinicId, scheduleId }) =>
          typeof clinicId === 'string' && typeof scheduleId === 'string'
      )
    ) {
      const clinics = await db.clinicSchedule.createMany({
        data: input,
      })
      if (clinics.count > 0) {
        return SuccessResponse(true, 200)
      }
      return ErrorResponse('NOT_FOUND')
    }

    return ErrorResponse('BAD_REQUEST')
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Delete many relationships at clinic
export async function DELETE(req: Request) {
  try {
    const { scheduleId, clinicId } = await req.json()

    if (
      scheduleId &&
      Array.isArray(scheduleId) &&
      scheduleId.every(
        ({ clinicId, scheduleId }) =>
          typeof clinicId === 'string' && typeof scheduleId === 'string'
      )
    ) {
      const clinics = await db.clinicSchedule.deleteMany({
        where: {
          clinicId: clinicId,
          scheduleId: { in: scheduleId },
        },
      })
      if (clinics.count > 0) {
        return SuccessResponse(true, 200)
      }
      return ErrorResponse('NOT_FOUND')
    }

    return ErrorResponse('BAD_REQUEST')
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
