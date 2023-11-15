import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { OwnerSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a owner
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const owner = await db.owner.delete({
      where: { id: params.id },
    })

    if (!owner) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a owner
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const owner = await db.owner.findFirst({
      where: { id: params.id },
    })

    if (!owner) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(owner, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a owner
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const newInput = exclude(input, ['createdAt', 'updatedAt'])
    const validated = safeParse(OwnerSchema, newInput)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, surname, email, phone, city, address } = validated.output

    const owner = await db.owner.update({
      where: { id: params.id },
      data: {
        name,
        surname,
        email,
        phone,
        city,
        address,
      },
    })

    return SuccessResponse(owner, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
