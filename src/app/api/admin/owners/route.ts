import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { OwnerSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all owners
export async function GET() {
  const owners = await db.owner.findMany()
  return SuccessResponse(owners, 200)
}

// Create a new owner
export async function POST(req: Request) {
  const input = await req.json()
  const validated = safeParse(OwnerSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { name, surname, email, phone, city, address } = validated.output

  try {
    const owner = await db.owner.create({
      data: {
        name,
        surname,
        email,
        phone,
        city,
        address,
      },
    })

    return SuccessResponse(owner, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
