import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: Request) {
  const { name, roles } = await req.json()
  try {
    const permission = await db.permission.create({
      data: {
        name,
        roles: {
          connect: roles,
        },
      },
    })
    return SuccessResponse(permission, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}
