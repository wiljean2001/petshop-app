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
  console.log('🚀 ~ file: route.ts:13 ~ PUT ~ attendanceId:', attendanceId)

  const input = await req.json()
  console.log('🚀 ~ file: route.ts:15 ~ PUT ~ input:', input)
  if (input.diagnosisDate) {
    input.diagnosisDate = new Date(input.diagnosisDate)
  }
  const newInput = exclude(input, ['createdAt', 'updatedAt'])
  const validated = safeParse(DiagnosticSchema, newInput)

  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  const { description, status, diagnosisDate, id } = validated.output
  console.log(
    '🚀 ~ file: route.ts:27 ~ PUT ~ validated.output:',
    validated.output
  )

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
    console.log(
      '🚀 ~ file: route.ts:44 ~ PUT ~ createdDiagnostic:',
      createdDiagnostic
    )
    // console.log('🚀 ~ file: route.ts:64 ~ PUT ~ result:', result)
    return SuccessResponse(createdDiagnostic, 200)
  } catch (error) {
    console.log('🚀 ~ file: route.ts:67 ~ PUT ~ error:', error)
    return ErrorResponse('BAD_USER_INPUT')
  }
}
