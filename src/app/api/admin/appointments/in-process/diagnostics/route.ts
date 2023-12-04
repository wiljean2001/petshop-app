import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { DiagnosticSchema } from '@/models/schemas.d'
import { NextResponse, NextRequest } from 'next/server'
import { safeParse } from 'valibot'

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const attendanceId = searchParams.get('attendanceId')

  if (!attendanceId) return ErrorResponse('BAD_USER_INPUT')


  const input = await req.json()

  if (input.diagnosisDate) {
    input.diagnosisDate = new Date(input.diagnosisDate)
  }
  const newInput = exclude(input, ['createdAt', 'updatedAt'])
  const validated = safeParse(DiagnosticSchema, newInput)

  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { description, status, diagnosisDate, id } = validated.output
  

  try {
    const createdDiagnostic = await db.diagnostics.upsert({
      create: {
        description,
        status,
        diagnosisDate: diagnosisDate!,
        attendanceId: attendanceId,
      },
      update: {
        description,
        status,
        diagnosisDate: diagnosisDate!,
      },
      where: { attendanceId: attendanceId },
    })
    
    
    return SuccessResponse(createdDiagnostic, 200)
  } catch (error) {
    
    return ErrorResponse('BAD_USER_INPUT')
  }
}
