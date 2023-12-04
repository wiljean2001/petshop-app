import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { VeterinarianSchema } from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

// Get all veterinarians
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const clinic = searchParams.get('clinic') || undefined
    const permissions = await db.veterinarian.findMany({
      where: {
        clinic: {
          id: clinic,
        },
      },
    })
    return SuccessResponse(permissions, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}

// Create a new veterinarian
export async function POST(req: NextRequest) {
  try {
    const input = await req.json()
    const validated = safeParse(VeterinarianSchema, input)
    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { email, name, phone, surname, specialty, clinicId } =
      validated.output

    const veterinarian = await db.veterinarian.create({
      data: {
        email,
        name,
        phone,
        surname,
        specialty,
        clinic: {
          connect: {
            id: clinicId!,
          },
        },
      },
    })
    return SuccessResponse(veterinarian, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
