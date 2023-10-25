import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'
// type NewResponse = NextResponse<{ user?: Permission; error?: string }>;
export const POST = async (req: Request) => {
  try {
    const permissions = await db.permission.findMany()
    return SuccessResponse(permissions, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}
