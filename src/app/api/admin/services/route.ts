import { ServiceStatusKey } from '@/config/const'
import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ServiceSchema } from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

// List all owners
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const state = (searchParams.get('state') as ServiceStatusKey) || undefined

  let where: {} | undefined
  if (state) {
    where = {
      state: state,
    }
  }
  const owners = await db.service.findMany({ where })
  return SuccessResponse(owners, 200)
}

// Create a new service
export async function POST(req: NextRequest) {
  try {
    const input = await req.json()

    const validated = safeParse(ServiceSchema, input)
    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const {
      name,
      cost,
      description,
      duration,
      requiresClinicalData,
      state, // , ServiceDetails
    } = validated.output

    // let CreateServiceDetails: {} | undefined

    // if (ServiceDetails) {
    //   CreateServiceDetails = {
    //     createMany: { data: ServiceDetails },
    //   }
    // }

    const service = await db.service.create({
      data: {
        name,
        cost,
        description,
        duration,
        image: '',
        state,
        requiresClinicalData: requiresClinicalData,
        // ServiceDetails: CreateServiceDetails,
      },
    })
    return SuccessResponse(service, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
