import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { RoleSchema } from '@/models/user'
import { safeParse } from 'valibot'

// Delete a role
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const role = await db.role.delete({
      where: { id: params.id },
    })

    if (!role) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a role
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const role = await db.role.findFirst({
      where: { id: params.id },
    })

    if (!role) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(role, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a role
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const validated = safeParse(RoleSchema, input)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name } = validated.output

    const role = await db.role.update({
      where: { id: params.id },
      data: { name,  },
    })

    return SuccessResponse(role, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
