import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { BreedSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a breed
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const breed = await db.breed.delete({
      where: { id: params.id },
    })

    if (!breed) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a breed
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const breed = await db.breed.findFirst({
      where: { id: params.id },
    })

    if (!breed) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(breed, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a breed
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const newInput = exclude(input, [
      'specie.createdAt',
      'specie.updatedAt',
      'createdAt',
      'updatedAt',
    ])
    console.log('🚀 ~ file: route.ts:58 ~ newInput:', newInput)
    const validated = safeParse(BreedSchema, newInput)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, specieId } = validated.output

    let specie

    if (specieId) {
      specie = {
        connect: { id: specieId },
      }
    }

    const breed = await db.breed.update({
      where: { id: params.id },
      data: {
        name,
        specie,
      },
    })

    return SuccessResponse(breed, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
