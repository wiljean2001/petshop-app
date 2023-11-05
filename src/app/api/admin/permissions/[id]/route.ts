import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { PermissionSchema } from '@/models/user'
import { safeParse } from 'valibot'

// Delete a permission
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const permission = await db.permission.delete({
      where: { id: params.id },
    })

    if (!permission) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a permission
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const permission = await db.permission.findFirst({
      where: { id: params.id },
    })

    if (!permission) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(permission, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a permission
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const validated = safeParse(PermissionSchema, input)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name } = validated.output

    const clinic = await db.clinic.update({
      where: { id: params.id },
      data: { name },
    })

    return SuccessResponse(clinic, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
