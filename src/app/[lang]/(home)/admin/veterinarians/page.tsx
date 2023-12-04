import { HeaderVeterinarian } from '@/components/data-table-shell/veterinarians/header'
import LoadVeterinarianTableShell from '@/components/data-table-shell/veterinarians/load-table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'
import { parseSortParameter } from '@/lib/utils'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}
export default async function VeterinariansPage({ searchParams }: Props) {
  const { page, per_page, sort, title, status, priority } = searchParams

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    name: typeof title === 'string' ? { contains: title } : undefined,
  }

  const orderBy =
    sort && typeof sort === 'string'
      ? parseSortParameter(sort)
      : { createdAt: 'desc' }

  const allClinic = db.veterinarian.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
      clinicId: true,
      clinic: true,
      phone: true,
      email: true,
      specialty: true,
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
      <DashboardHeader heading='Veterinarios'>
        <HeaderVeterinarian />
      </DashboardHeader>

      {/* Table for show the clinics */}
      <LoadVeterinarianTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}
