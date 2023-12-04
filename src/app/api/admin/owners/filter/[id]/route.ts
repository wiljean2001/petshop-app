import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const pets = await db.pet.findMany({
        where: { ownerId: params.id },
    });

    return SuccessResponse(pets, 200)
  } catch (error) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
