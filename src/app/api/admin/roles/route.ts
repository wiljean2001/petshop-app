import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'

const getRoles = async () => {
  // get all roles to db
  return await db.role.findMany()
}

export const POST = async () => {
  try {
    const results = await getRoles()
    console.log(results)
    return SuccessResponse(results, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}

export async function GET() {
  try {
    const results = await getRoles()
    console.log(results)
    return SuccessResponse(results, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}
