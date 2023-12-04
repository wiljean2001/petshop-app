import { ErrorResponse, SuccessResponse } from '@/helpers/ResponseError'
import { exclude } from '@/lib/exclude'
import { db } from '@/lib/prisma'
import { PrescriptionSchema } from '@/models/schemas.d'
import { NextResponse, NextRequest } from 'next/server'
import { safeParse } from 'valibot'

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const attendanceId = searchParams.get('attendanceId')

  if (!attendanceId) return ErrorResponse('BAD_USER_INPUT')

  const input = await req.json()
  console.log('🚀 ~ file: route.ts:15 ~ PUT ~ input:', input)

  // Convert the props has dates
  if (input.emissionDate) {
    input.emissionDate = new Date(input.emissionDate)
  }
  if (input.prescribedItem && Array.isArray(input.prescribedItem)) {
    input.prescribedItem = input.prescribedItem.map((item: any) => {
      if (item.startDate) {
        item.startDate = new Date(item.startDate)
      }
      if (item.endDate) {
        item.endDate = new Date(item.endDate)
      }
      return item
    })
  }

  const newInput = exclude(input, ['createdAt', 'updatedAt'])
  const validated = safeParse(PrescriptionSchema, newInput)

  if (!validated.success) {
    return ErrorResponse('BAD_USER_INPUT')
  }

  // prescribedItem -> array of items
  const { instructions, emissionDate, id, prescribedItem } = validated.output
  console.log(
    '🚀 ~ file: route.ts:28 ~ PUT ~ validated.output:',
    validated.output
  )

  try {
    if (id) {
      // Inicializar estructuras para actualizaciones y creaciones
      let updates: {
        where: { id: string }
        data: {
          description: string
          instructions: string
          dosage: string
          startDate: Date
          endDate: Date
          type: 'MEDICATION' | 'DIET' | 'RECOMMENDATION' | 'OTHER'
        }
      }[] = []
      let creates: {
        description: string
        instructions: string
        dosage: string
        startDate: Date
        endDate: Date
        type: 'MEDICATION' | 'DIET' | 'RECOMMENDATION' | 'OTHER'
      }[] = []

      // Iterar sobre cada prescribedItem
      prescribedItem.forEach((item: any) => {
        if (item.id) {
          // Si el item tiene ID, preparar para actualización
          updates.push({
            where: { id: item.id },
            data: {
              description: item.description,
              instructions: item.instructions,
              dosage: item.dosage,
              startDate: item.startDate,
              endDate: item.endDate,
              type: item.type,
            },
          })
        } else {
          // Si el item no tiene ID, preparar para creación
          creates.push({
            description: item.description,
            instructions: item.instructions,
            dosage: item.dosage,
            startDate: item.startDate,
            endDate: item.endDate,
            type: item.type,
          })
        }
      })

      const prescription = await db.prescription.update({
        where: { id },
        data: {
          instructions,
          emissionDate: emissionDate!,
          prescribedItem: {
            updateMany: updates,
            createMany: {
              data: creates,
            },
          },
        },
      })
      console.log('🚀 ~ file: route.ts:52 ~ PUT ~ prescription:', prescription)
      return SuccessResponse(prescription, 200)
    }
    // Create
    const prescription = await db.prescription.create({
      data: {
        instructions,
        emissionDate: emissionDate!,
        attendance: {
          connect: {
            id: attendanceId,
          },
        },
        prescribedItem: {
          createMany: {
            data: prescribedItem.map((item) => ({
              description: item.description,
              instructions: item.instructions,
              dosage: item.dosage,
              startDate: item.startDate,
              endDate: item.endDate,
              type: item.type,
            })),
          },
        },
      },
    })
    console.log('🚀 ~ file: route.ts:80 ~ PUT ~ prescription:', prescription)

    return SuccessResponse(prescription, 200)
  } catch (error) {
    console.log('🚀 ~ file: route.ts:67 ~ PUT ~ error:', error)
    return ErrorResponse('BAD_USER_INPUT')
  }
}
