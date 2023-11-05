import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { RoleSchema } from '@/models/user'
import { safeParse } from 'valibot'

// Get all roles
export async function GET() {
  try {
    const permissions = await db.role.findMany()
    return SuccessResponse(permissions, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}

// Create a new role
export async function POST(req: Request) {
  // const { name, permissions } = {
  //   name: 'admin',
  //   permissions: [],
  // }
  const input = await req.json()
  const validated = safeParse(RoleSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { name } = validated.output

  try {
    const role = await db.role.create({
      data: {
        name,
      },
    })
    return SuccessResponse(role, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
