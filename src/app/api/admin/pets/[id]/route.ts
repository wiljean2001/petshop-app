import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { PetSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a pet
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pet = await db.pet.delete({
      where: { id: params.id },
    })

    if (!pet) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a pet
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pet = await db.pet.findFirst({
      where: { id: params.id },
    })

    if (!pet) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(pet, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a pet
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const validated = safeParse(PetSchema, input)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, gender, ownerId, birthdate, breedId } = validated.output

    const pet = await db.pet.update({
      where: { id: params.id },
      data: {
        name,
        gender,
        birthdate,
        owner: {
          connect: { id: ownerId },
        },
        breed: {
          connect: {
            id: breedId,
          },
        },
      },
    })

    return SuccessResponse(pet, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
