import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { VeterinarianSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a veterinarian
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const veterinarian = await db.veterinarian.delete({
      where: { id: params.id },
    })

    if (!veterinarian) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a veterinarian
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const veterinarian = await db.veterinarian.findFirst({
      where: { id: params.id },
    })

    if (!veterinarian) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(veterinarian, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a veterinarian
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const input = await request.json()
  const validated = safeParse(VeterinarianSchema, input)

  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { name, email, phone, specialty, surname, clinicId } = validated.output

  try {
    const veterinarian = await db.veterinarian.update({
      where: { id: params.id },
      data: { name, email, phone, specialty, surname, clinicId },
    })

    return SuccessResponse(veterinarian, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
