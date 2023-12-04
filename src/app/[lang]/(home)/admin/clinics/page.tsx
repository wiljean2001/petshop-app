import { HeaderClinics } from '@/components/data-table-shell/clinics/header'
import LoadClinicTableShell from '@/components/data-table-shell/clinics/load-table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'
import { parseSortParameter } from '@/lib/utils'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ClinicsPage({ searchParams }: Props) {
  const { page, per_page, sort, name, location } = searchParams

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    name: typeof name === 'string' ? { contains: name } : undefined,
    location: typeof location === 'string' ? { contains: location } : undefined,
  }

  const orderBy =
    sort && typeof sort === 'string'
      ? parseSortParameter(sort)
      : { createdAt: 'desc' }

  const allClinic = db.clinic.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      image: true,
      location: true,
      ClinicSchedule: {
        select: { schedule: true },
      },
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy,
    where,
  })

  const totalClinics = db.clinic.count({ where })

  const result = await db.$transaction([allClinic, totalClinics])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Clínicas'>
        <HeaderClinics />
      </DashboardHeader>

      {/* Table for show the clinics */}
      <LoadClinicTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}