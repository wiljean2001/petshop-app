import MedicalRecord from '@/components/medical-record/medical-record'
import SearchOwnerPet from '@/components/medical-record/search-owner-pet'
import { db } from '@/lib/prisma'
import { MedicalRecord as MedicalRecordType } from '@/types'

interface Props {
  searchParams: {
    [key: string]: string
  }
}
export default async function MedicalRecordPage({ searchParams }: Props) {
  const { petId } = searchParams
  let medicalRecord: MedicalRecordType | null = null

  const getMedicalRecord = async (petId: string) => {
    return await db.pet.findUnique({
      where: { id: petId },
      select: {
        name: true,
        birthdate: true,
        gender: true,
        color: true,
        medicalNotes: true,
        breed: {
          select: {
            id: true,
            name: true,
            specie: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        Appointments: {
          select: {
            id: true,
            scheduledDateTime: true,
            beginningDateTime: true,
            status: true,
            veterinarian: true,
            ServiceAppointments: {
              select: {
                id: true,
                details: true,
                service: true,
                clinicalData: true,
              },
            },
            Attendances: {
              select: {
                id: true,
                date: true,
                Diagnostics: true,
                Prescription: {
                  select: {
                    instructions: true,
                    prescribedItem: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  if (petId) {
    medicalRecord = (await getMedicalRecord(petId!)) as MedicalRecordType | null
    console.log(
      '🚀 ~ file: page.tsx:50 ~ MedicalRecordPage ~ medicalRecord:',
      medicalRecord
    )
  }

  return (
    <>
      {/* Search */}
      <SearchOwnerPet />
      {petId && <MedicalRecord record={medicalRecord} />}
    </>
  )
}
