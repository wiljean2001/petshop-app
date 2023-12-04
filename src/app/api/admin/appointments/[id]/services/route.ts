import { ErrorResponse } from '@/helpers/ResponseError'
import {
  ServiceAppointmentArraySchema,
  ServiceAppointmentSchema,
} from '@/models/schemas.d'
import { NextRequest } from 'next/server'
import { safeParse } from 'valibot'

export async function PUT(req: NextRequest) {
  try {
    const input = await req.json()
    const validated = safeParse(ServiceAppointmentArraySchema, input)
    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }
    
  } catch (error) {
    //
  }
}
