import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ScheduleSchema } from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

// Get all roles
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const clinic = searchParams.get('clinic') || undefined

    let where
    if (clinic) {
      where = {
        ClinicSchedule: {
          some: {
            clinicId: clinic,
          },
        },
      }
    }
    const schedules = await db.schedule.findMany({ where })
    return SuccessResponse(schedules, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}

// Create a new schedule
export async function POST(req: NextRequest) {
  const input = await req.json()
  const validated = safeParse(ScheduleSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { dayWeek, openingHour, closingHour } = validated.output

  try {
    const schedule = await db.schedule.create({
      data: {
        dayWeek,
        openingHour,
        closingHour,
      },
    })
    return SuccessResponse(schedule, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
