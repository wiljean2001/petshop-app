import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'

export async function POST(req: Request) {}

// Delete many
export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json()

    if (
      ids &&
      Array.isArray(ids) &&
      ids.every((item) => typeof item === 'string')
    ) {
      const clinics = await db.clinic.deleteMany({
        where: {
          id: { in: ids },
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
