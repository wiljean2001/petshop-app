import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { ClinicSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a clinic
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Utiliza una transacción para eliminar la clínica y sus horarios asociados
    await db.$transaction(async (prisma) => {
      // Primero, eliminar las asociaciones de horarios de la clínica
      await prisma.clinicSchedule.deleteMany({
        where: { clinicId: params.id },
      })

      // Luego, eliminar la clínica
      await prisma.clinic.delete({
        where: { id: params.id },
      })
    })

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a clinic
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clinic = await db.clinic.findFirst({
      where: { id: params.id },
    })

    if (!clinic) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(clinic, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a clinic
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const newInput = exclude(input, [
      'createdAt',
      'updatedAt',
      'ClinicSchedule[]',
    ])
    const validated = safeParse(ClinicSchema, newInput)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, location, image, phone, scheduleIds } = validated.output

    // Utiliza una transacción para actualizar la clínica y sus horarios asociados
    const updatedClinic = await db.$transaction(async (prisma) => {
      // Actualizar la clínica
      const clinic = await prisma.clinic.update({
        where: { id: params.id },
        data: { name, location, image, phone },
      })

      // Si se proporcionan scheduleIds, actualizar la asociación de horarios
      if (scheduleIds) {
        // Primero, eliminar las asociaciones existentes
        await prisma.clinicSchedule.deleteMany({
          where: { clinicId: params.id },
        })

        // Luego, crear nuevas asociaciones con los horarios proporcionados
        await prisma.clinicSchedule.createMany({
          data: scheduleIds.map((scheduleId) => ({
            clinicId: clinic.id,
            scheduleId: scheduleId,
          })),
        })
      }

      return clinic
    })
    return SuccessResponse(updatedClinic, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
