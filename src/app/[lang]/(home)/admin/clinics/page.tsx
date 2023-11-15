import { HeaderClinics } from '@/components/data-table-shell/clinics/header'
import { ClinicsTableShell } from '@/components/data-table-shell/clinics/table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ClinicsPage({ searchParams }: Props) {
  const { page, per_page, sort, name, location } = searchParams
  console.log({
    name,
    location,
  })

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    name: typeof name === 'string' ? { contains: name } : undefined,
    location: typeof location === 'string' ? { contains: location } : undefined,
  }

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
    orderBy:
      typeof sort === 'string'
        ? { [sort.split('.')[0]]: sort.split('.')[1] }
        : { id: 'desc' },
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
      <ClinicsTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
