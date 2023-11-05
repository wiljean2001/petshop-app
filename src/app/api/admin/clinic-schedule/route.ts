import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ClinicScheduleSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all clinics
export async function GET() {
  const clinics = await db.clinicSchedule.findMany()
  return SuccessResponse(clinics, 200)
}

// Create a relationship between role and permission
export async function POST(req: Request) {
  const input = await req.json()
  const validated = safeParse(ClinicScheduleSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { clinicId, scheduleId } = validated.output

  try {
    const clinicSchedule = await db.clinicSchedule.create({
      data: {
        clinic: {
          connect: {
            id: clinicId,
          },
        },
        schedule: {
          connect: {
            id: scheduleId,
          },
        },
      },
    })

    return SuccessResponse(clinicSchedule, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
