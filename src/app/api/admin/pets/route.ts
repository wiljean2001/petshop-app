import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { PetSchema } from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

// List all pets
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const owner = searchParams.get('owner') || undefined

  const pets = await db.pet.findMany({
    where: {
      owner: {
        id: owner,
      },
    },
    select: {
      id: true,
      name: true,
      owner: true,
      breed: true,
    },
  })
  return SuccessResponse(pets, 200)
}

// Create a nuew pet
export async function POST(req: NextRequest) {
  const input = await req.json()

  // Convertir la cadena de fecha a un objeto Date
  if (input.birthdate) {
    input.birthdate = new Date(input.birthdate)
  }

  const validated = safeParse(PetSchema, input)

  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const {
    name,
    gender,
    ownerId,
    birthdate,
    breedId,
    color,
    derivedFrom,
    medicalNotes,
  } = validated.output

  try {
    const pet = await db.pet.create({
      data: {
        name,
        gender,
        color,
        derivedFrom,
        medicalNotes,
        birthdate,
        owner: {
          connect: { id: ownerId },
        },
        breed: {
          connect: {
            id: breedId,
          },
        },
      },
    })

    return SuccessResponse(pet, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
