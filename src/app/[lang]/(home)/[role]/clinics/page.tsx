import { HeaderClinics } from '@/components/data-table-shell/clinics/header-clinics'
import { ClinicsTableShell } from '@/components/data-table-shell/clinics/clinics-table-shell'
import { db } from '@/lib/prisma'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Clinics({ searchParams }: Props) {
  const { page, per_page, sort, title, status, priority } = searchParams
  console.log({
    title,
    status,
    priority,
  })

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    name: typeof title === 'string' ? { contains: title } : undefined,
  }

  const allClinic = db.clinic.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      location: true,
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
      <HeaderClinics />

      {/* Table for show the clinics */}
      <ClinicsTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
