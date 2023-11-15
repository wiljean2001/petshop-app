import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { db } from '@/lib/prisma'
import { ClinicSchema } from '@/models/schemas'
import { safeParse } from 'valibot'

// List all clinics
export async function GET() {
  const clinics = await db.clinic.findMany()
  return SuccessResponse(clinics, 200)
}

// Create a new clinic
export async function POST(req: Request) {
  try {
    const input = await req.json()
    const validated = safeParse(ClinicSchema, input)
    if (!validated.success) {
      return ErrorResponse('BAD_USER_INPUT')
    }

    const { name, location, image, phone, scheduleIds } = validated.output
    // Se utiliza $transaction para garantizar la atomicidad de la operación
    const clinic = await db.$transaction(async (prisma) => {
      const newClinic = await prisma.clinic.create({
        data: {
          name,
          location,
          image,
          phone,
        },
      })

      // Crear las asociaciones de horarios solo si hay scheduleIds
      if (scheduleIds && scheduleIds.length > 0) {
        await prisma.clinicSchedule.createMany({
          data: scheduleIds.map((scheduleId) => ({
            clinicId: newClinic.id,
            scheduleId: scheduleId,
          })),
        })
      }

      return newClinic
    })

    // const clinic = await db.clinic.create({
    //   data: {
    //     name,
    //     location,
    //     image,
    //     phone,
    //   },
    // })

    // if (scheduleIds) {
    //   await db.clinicSchedule.createMany({
    //     data: scheduleIds.map((scheduleId) => ({
    //       clinicId: clinic.id,
    //       scheduleId: scheduleId,
    //     })),
    //   })
    // }

    return SuccessResponse(clinic, 200)
  } catch (error) {
    return ErrorResponse('BAD_REQUEST')
  }
}
