import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ClinicSchema } from '@/models/schemas'
import { safeParse } from 'valibot'
export async function POST(req: Request) {
  try {
    const input = await req.json()
    const validated = safeParse(ClinicSchema, input)
    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, location, image, phone } = validated.output

    const clinic = await db.clinic.create({
      data: {
        name,
        location,
        image: '',
        phone,
      },
    })
    console.log('🚀 ~ file: route.ts:14 ~ POST ~ clinic:', clinic)
    return SuccessResponse(clinic, 200)
  } catch (error) {
    console.log('🚀 ~ file: route.ts:26 ~ POST ~ error:', error)
    return ErrorResponse('BAD_REQUEST')
  }
}
