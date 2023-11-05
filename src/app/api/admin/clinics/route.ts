import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ClinicSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all clinics
export async function GET() {
  const clinics = await db.clinic.findMany()
  return SuccessResponse(clinics, 200)
}

// Create a nuew clinic
export async function POST(req: Request) {
  const input = await req.json()
  console.log('🚀 ~ file: route.ts:15 ~ POST ~ input:', input)
  const validated = safeParse(ClinicSchema, input)
  if (!validated.success) {
    console.log(
      '🚀 ~ file: route.ts:17 ~ POST ~ validated.success:',
      validated.success
    )
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { name, location, image, phone } = validated.output

  try {
    const clinic = await db.clinic.create({
      data: {
        name,
        location,
        image,
        phone,
      },
    })

    return SuccessResponse(clinic, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
