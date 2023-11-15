import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ServiceSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all owners
export async function GET() {
  const owners = await db.service.findMany()
  return SuccessResponse(owners, 200)
}

// Create a new service
export async function POST(req: Request) {
  try {
    const input = await req.json()

    const validated = safeParse(ServiceSchema, input)
    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, cost, description, duration, state, ServiceDetails } =
      validated.output
    console.log(
      '🚀 ~ file: route.ts:23 ~ POST ~ ServiceDetails:',
      ServiceDetails
    )

    let CreateServiceDetails: {} | undefined

    if (ServiceDetails) {
      CreateServiceDetails = {
        createMany: { data: ServiceDetails },
      }
    }
    console.log(
      '🚀 ~ file: route.ts:27 ~ POST ~ CreateServiceDetails:',
      CreateServiceDetails
    )

    const service = await db.service.create({
      data: {
        name,
        cost,
        description,
        duration,
        image: '',
        state,
        ServiceDetails: CreateServiceDetails,
      },
    })
    return SuccessResponse(service, 200)
  } catch (error) {
    console.log('🚀 ~ file: route.ts:55 ~ POST ~ error:', error)
    return ErrorResponse('BAD_REQUEST')
  }
}
