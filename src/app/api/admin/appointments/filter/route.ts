import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
// import { AppointmentStatus } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

// Here is the endpoint for filter all appointments with the next restrictions:
// A specific veterinary or many veterinaries from a clinic or a specific clinic with all respective veterinaries.
// A specific pet owner or many pet owners with their respective pets
// A specific pet or many pets
// A specific clinic or many clinics
// A specific status of appointment or with many status of appointments
// The range of dates is required for all filters
export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  try {
    const vetId = searchParams.get('vetId')
    const vetIds = searchParams.get('vetIds') as Array<string> | null
    const ownerId = searchParams.get('ownerId')
    const ownerIds = searchParams.get('ownerIds') as Array<string> | null
    const petId = searchParams.get('petId')
    const petIds = searchParams.get('petIds') as Array<string> | null
    const clinicId = searchParams.get('clinicId')
    const clinicIds = searchParams.get('clinicIds') as Array<string> | null
    const status = searchParams.get('status') as Array<string> | null
    const startDate = searchParams.get('startDate')!
    const endDate = searchParams.get('endDate')!

    // Construir la consulta dinámica con filtros
    const whereClause: any = {
      dateTime: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
      ...(vetId && { vetId }),
      ...(vetIds && { vetId: { in: vetIds } }),
      ...(ownerId && { pet: { ownerId } }),
      ...(ownerIds && { pet: { ownerId: { in: ownerIds } } }),
      ...(petId && { petId }),
      ...(petIds && { petId: { in: petIds } }),
      ...(clinicId && { veterinarian: { clinicId } }),
      ...(clinicIds && { veterinarian: { clinicId: { in: clinicIds } } }),
      ...(status && { status: { in: status } }),
    }

    const appointments = await db.appointments.findMany({
      where: whereClause,
      include: {
        pet: true,
        veterinarian: true,
      },
    })
    return SuccessResponse(appointments, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}

// When vetId is not specified then ownerId is required
// After that we need to check the petId and clinicalId
//
