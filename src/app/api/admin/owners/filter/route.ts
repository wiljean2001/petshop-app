import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams

    const searchTerm = searchParams.get('searchTerm') || ''

    const owner = await db.owner.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { surname: { contains: searchTerm } },
        ],
      },
      select: {
        Pet: {
          select: {
            id: true,
            name: true,
            breed: {
              select: {
                name: true,
                specie: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        name: true,
        surname: true,
        id: true,
      },
    })

    return SuccessResponse(owner, 200)
  } catch (error) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
