import { SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'

export async function POST() {
  const clinics = await db.clinic.findMany()
  return SuccessResponse(clinics, 200)
}
