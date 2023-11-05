import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ClinicSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a clinic
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clinic = await db.clinic.delete({
      where: { id: params.id },
    })

    if (!clinic) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a clinic
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clinic = await db.clinic.findFirst({
      where: { id: params.id },
    })

    if (!clinic) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(clinic, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a clinic
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const validated = safeParse(ClinicSchema, input)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, location, image, phone } = validated.output

    const clinic = await db.clinic.update({
      where: { id: params.id },
      data: {
        name,
        location,
        image: '',
        phone,
      },
    })

    return SuccessResponse(clinic, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
