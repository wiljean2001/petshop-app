import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ClinicScheduleSchema, ClinicSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a clinicSchedule
export async function DELETE(
  req: Request,
  { params }: { params: { clinicId: string; scheduleId: string } }
) {
  try {
    const clinicSchedule = await db.clinicSchedule.delete({
      where: {
        clinicId_scheduleId: {
          clinicId: params.clinicId,
          scheduleId: params.scheduleId,
        },
      },
    })

    if (!clinicSchedule) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a clinicSchedule
export async function GET(
  request: Request,
  { params }: { params: { clinicId: string; scheduleId: string } }
) {
  try {
    const clinicSchedule = await db.clinicSchedule.findFirst({
      where: { clinicId: params.clinicId, scheduleId: params.scheduleId },
    })

    if (!clinicSchedule) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(clinicSchedule, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a clinicSchedule
export async function PUT(
  request: Request,
  { params }: { params: { clinicId: string; scheduleId: string } }
) {
  try {
    const input = await request.json()
    const { newClinicId, newScheduleId } = input.newClinicId // Obtener el nuevo clinicId del cuerpo de la solicitud

    let data: any

    // Si newClinicId es proporcionado, agregarlo a data
    if (newClinicId) {
      data.clinic = {
        connect: { id: Number(newClinicId) },
      }
    }

    // Si newScheduleId es proporcionado, agregarlo a data
    if (newScheduleId) {
      data.schedule = {
        connect: { id: Number(newScheduleId) },
      }
    }
    
    const clinicSchedule = await db.clinicSchedule.update({
      where: {
        clinicId_scheduleId: {
          clinicId: params.clinicId,
          scheduleId: params.scheduleId,
        },
      },
      data,
    })

    return SuccessResponse(clinicSchedule, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
