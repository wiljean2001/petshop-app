import { db } from '@/lib/prisma'
import { HeaderBreed } from '@/components/data-table-shell/breeds/header'
import { BreedsTableShell } from '@/components/data-table-shell/breeds/table-shell'
import { Suspense } from 'react'
import { DataTableLoading } from '@/components/data-table/data-table-loading'
import { DashboardHeader } from '@/components/layout/auth/header'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function BreedsPage({ searchParams }: Props) {
  const { page, per_page, sort, name } = searchParams
  console.log({
    name,
  })

  // limit the number of pages to be returned
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Skip the first page if there are no more pages to return
  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  const where = {
    name: typeof name === 'string' ? { contains: name } : undefined,
  }

  const allBreeds = db.breed.findMany({
    select: {
      id: true,
      name: true,
      specieId: true,
      specie: true,
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

  const totalClinics = db.breed.count({ where })

  const result = await db.$transaction([allBreeds, totalClinics])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      {/* Title and Buttons for add*/}
      <DashboardHeader heading='Razas'>
        <HeaderBreed />
      </DashboardHeader>

      {/* Table for show the clinics */}
      <BreedsTableShell data={result[0]} pageCount={pageCount} />
    </>
  )
}

// toolkit.fymconsulting
