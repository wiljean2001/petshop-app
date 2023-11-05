import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { SpecieSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all clinics
export async function GET() {
  const clinics = await db.specie.findMany()
  return SuccessResponse(clinics, 200)
}

// Create a nuew specie
export async function POST(req: Request) {
  const input = await req.json()
  const validated = safeParse(SpecieSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { name } = validated.output

  try {
    const specie = await db.specie.create({
      data: { name },
    })

    return SuccessResponse(specie, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
