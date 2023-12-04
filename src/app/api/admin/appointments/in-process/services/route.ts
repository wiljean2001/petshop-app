import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { ServiceAppointmentArraySchema } from '@/models/schemas.d'
import { NextResponse, NextRequest } from 'next/server'
import { safeParse } from 'valibot'

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const appointmentId = searchParams.get('appointmentId')

  if (!appointmentId) return ErrorResponse('BAD_USER_INPUT')

  const input = await req.json()
  if (input.dateTime) {
    input.dateTime = new Date(input.dateTime)
  }
  const newInput = exclude(input, [
    'services[].createdAt',
    'services[].updatedAt',
  ])
  const validated = safeParse(ServiceAppointmentArraySchema, newInput)

  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { services, dateTime } = validated.output

  if (!dateTime) return ErrorResponse('BAD_USER_INPUT')

  try {
    // Actualizar citas de servicios
    const serviceAppointmentUpdates = services.map(async (service) => {
      const updated = await db.serviceAppointments.update({
        where: { id: service.id },
        // data: updateData,
        data: {
          date: dateTime,
          cost: service.cost,
          details: service.details,
          clinicalData: {
            upsert: service.clinicalData
              ? {
                  create: {
                    ...service.clinicalData,
                    registrationDate: dateTime,
                    serviceAppointmentId: service.id!,
                    extras: service.clinicalData?.extras || '',
                  },
                  update: {
                    ...service.clinicalData,
                    registrationDate: dateTime,
                    extras: service.clinicalData?.extras || '',
                  },
                  where: { id: service.clinicalData.id },
                }
              : undefined,
          },
        },
      })
    })

    // const result = await db.$transaction([...serviceAppointmentUpdates])
    return SuccessResponse({}, 200)
  } catch (error) {
    return ErrorResponse('BAD_USER_INPUT')
  }
}
