import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { PermissionSchema } from '@/models/user'
import { NextResponse } from 'next/server'
import { safeParse } from 'valibot'
// type NewResponse = NextResponse<{ user?: Permission; error?: string }>;
export async function GET() {
  try {
    const permissions = await db.permission.findMany()
    return SuccessResponse(permissions, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}

export async function POST(req: Request) {
  const input = await req.json()
  const validated = safeParse(PermissionSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { name } = validated.output
  try {
    const permission = await db.permission.create({
      data: { name },
    })
    return SuccessResponse(permission, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}
