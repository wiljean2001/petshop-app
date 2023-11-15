import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { AppointmentSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Delete a appointments
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointments = await db.appointments.delete({
      where: { id: params.id },
    })

    if (!appointments) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(true, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Find a appointments
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointments = await db.appointments.findFirst({
      where: { id: params.id },
    })

    if (!appointments) return ErrorResponse('NOT_FOUND')

    return SuccessResponse(appointments, 200)
  } catch (error) {
    console.error(error) // log the error for debugging
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}

// Update a appointments
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const input = await request.json()
    const newInput = exclude(input, [
      'pet',
      'veterinarian',
      'createdAt',
      'updatedAt',
    ])
    if(newInput.dateTime){
      newInput.dateTime = new Date(newInput.dateTime)
    }
    const validated = safeParse(AppointmentSchema, newInput)

    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { status, petId, vetId, dateTime } = validated.output

    const appointments = await db.appointments.update({
      where: { id: params.id },
      data: {
        status,
        dateTime,
        veterinarian: {
          connect: { id: vetId },
        },
        pet: {
          connect: { id: petId },
        },
      },
    })

    return SuccessResponse(appointments, 200)
  } catch (err) {
    return ErrorResponse('INTERNAL_SERVER_ERROR')
  }
}
