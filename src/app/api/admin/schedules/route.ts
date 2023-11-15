import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ScheduleSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// Get all roles
export async function GET() {
  try {
    const permissions = await db.schedule.findMany()
    return SuccessResponse(permissions, 200)
  } catch (error: any) {
    return ErrorResponse('BAD_REQUEST')
  }
}

// Create a new schedule
export async function POST(req: Request) {
  const input = await req.json()
  const validated = safeParse(ScheduleSchema, input)
  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { day_week, openingHour, closingHour } = validated.output

  try {
    const schedule = await db.schedule.create({
      data: {
        day_week,
        openingHour,
        closingHour,
      },
    })
    console.log('🚀 ~ file: route.ts:50 ~ POST ~ schedule:', schedule)
    return SuccessResponse(schedule, 200)
  } catch (error) {
    console.log('🚀 ~ file: route.ts:53 ~ POST ~ error:', error)
    return ErrorResponse('BAD_REQUEST')
  }
}
