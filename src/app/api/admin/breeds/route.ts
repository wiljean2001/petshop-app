import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { BreedSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all clinics
export async function GET() {
  const clinics = await db.breed.findMany()
  return SuccessResponse(clinics, 200)
}

// Create a nuew breed
export async function POST(req: Request) {
  const input = await req.json()
  const validated = safeParse(BreedSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { name, specieId } = validated.output

  let specie

  if (specieId) {
    specie = {
      connect: { id: specieId },
    }
  }

  try {
    const breed = await db.breed.create({
      data: {
        name,
        specie,
      },
    })

    return SuccessResponse(breed, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
