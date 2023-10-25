import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, permissions } = await req.json()

    const role = await db.role.create({
      data: {
        name,
        permissions: {
          connect: permissions,
        },
      },
    })
    console.log('🚀 ~ file: route.ts:14 ~ POST ~ role:', role)
    return SuccessResponse(role, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
export async function GET(req: Request) {
  try {
    // const { name, permissions } = await req.json()
    const { name, permissions } = {
      name: 'admin',
      permissions: [],
    }

    const role = await db.role.create({
      data: {
        name,
        permissions: {
          connect: permissions,
        },
      },
    })
    return SuccessResponse(role, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
