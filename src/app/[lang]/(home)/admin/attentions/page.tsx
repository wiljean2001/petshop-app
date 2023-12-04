import { db } from '@/lib/prisma'
import { DashboardHeader } from '@/components/layout/auth/header'
import { parseSortParameter } from '@/lib/utils'
import LoadAttentionTableShell from '@/components/data-table-shell/attentions/load-table-shell'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AttentionsPage({ searchParams }: Props) {
  const { page, per_page, sort, date } = searchParams

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  // Convertir 'date' a un objeto Date, si es una cadena de fecha válida
  let dateObject
  if (date && !isNaN(Date.parse(date as string))) {
    dateObject = new Date(date as string)
  }

  const where = {
    // Usar el objeto Date si 'date' es una cadena válida, de lo contrario undefined
    date: dateObject ? dateObject.toISOString() : undefined,
  }

  // let orderBy
  // if (typeof sort === 'string') {
  //   const [field, order] = sort.split('.')
  //   orderBy = { [field.replace('.', '_')]: order }
  // } else {
  //   orderBy = { date: 'desc' as any | undefined }
  // }
  const orderBy =
    sort && typeof sort === 'string'
      ? parseSortParameter(sort)
      : { date: 'desc' }

  const allAttentions = db.attendances.findMany({
    select: {
      id: true,
      date: true,
      appointment: {
        select: {
          pet: {
            select: {
              name: true,
              breed: {
                select: { name: true },
              },
              owner: {
                select: {
                  name: true,
                  surname: true,
                },
              },
            },
          },
          scheduledDateTime: true,
          status: true,
          veterinarian: {
            select: {
              name: true,
              surname: true,
              specialty: true,
            },
          },
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy,
    where,
  })

  const totalAttentions = db.attendances.count({ where })

  const result = await db.$transaction([allAttentions, totalAttentions])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Atenciones'>
        {/* <HeaderBreed /> */}
      </DashboardHeader>

      {/* Table for show the Attentions */}
      <LoadAttentionTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
