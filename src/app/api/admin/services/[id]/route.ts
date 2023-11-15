import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { ServiceSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a service
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await db.service.delete({
      where: { id: params.id },
    })

    if (!service) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a service
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await db.service.findFirst({
      where: { id: params.id },
    })

    if (!service) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(service, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a service
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const newInput = exclude(input, [
      'createdAt',
      'updatedAt',
      'ServiceDetails[].updatedAt',
      'ServiceDetails[].createdAt',
    ])
    console.log('🚀 ~ file: route.ts:58 ~ newInput:', newInput)
    const validated = safeParse(ServiceSchema, newInput)
    if (!validated.success) {
      console.log(
        '🚀 ~ file: route.ts:61 ~ validated.success:',
        validated.success
      )
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, cost, description, duration, state, ServiceDetails } =
      validated.output

    // Inicia la transacción
    const transaction = []

    // Actualizar el servicio
    const serviceUpdateData = {
      name,
      cost,
      description,
      duration,
      state,
    }

    transaction.push(
      db.service.update({
        where: { id: params.id },
        data: serviceUpdateData,
      })
    )
    // Primero, borrar todos los ServiceDetails existentes para este servicio
    transaction.push(
      db.serviceDetails.deleteMany({
        where: { serviceId: params.id },
      })
    )
    // Si hay detalles para actualizar o crear
    if (ServiceDetails) {
      // Ahora, crear nuevos ServiceDetails con los datos proporcionados
      let CreateServiceDetails: {} | undefined

      if (ServiceDetails) {
        CreateServiceDetails = {
          createMany: { data: ServiceDetails },
        }
      }
      transaction.push(
        db.service.update({
          where: { id: params.id },
          data: {
            ServiceDetails: CreateServiceDetails,
          },
        })
      )
    }

    // Ejecutar todas las operaciones como parte de una transacción
    await db.$transaction(transaction)

    // Si llegamos aquí, la transacción fue exitosa
    return SuccessResponse({ ...serviceUpdateData, ServiceDetails }, 200)
  } catch (error) {
    // Si algo falla, Prisma revertirá automáticamente cualquier cambio parcial
    return ErrorResponse('BAD_REQUEST')
  }
}
