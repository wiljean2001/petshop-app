import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ClinicSchema, SpecieSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a specie
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const specie = await db.specie.delete({
      where: { id: params.id },
    })

    if (!specie) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a specie
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const specie = await db.specie.findFirst({
      where: { id: params.id },
    })

    if (!specie) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(specie, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a specie
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const validated = safeParse(SpecieSchema, input)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name } = validated.output

    const specie = await db.specie.update({
      where: { id: params.id },
      data: { name },
    })

    return SuccessResponse(specie, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
