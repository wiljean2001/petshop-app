import { SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'

// List all clinics
export async function GET() {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    where: {
      role: 'user',
    },
  })
  console.log('🚀 ~ GET ~ users:', users)
  return SuccessResponse(users, 200)
}
