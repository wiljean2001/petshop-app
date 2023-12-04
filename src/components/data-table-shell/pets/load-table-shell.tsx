'use client'
import { IPet } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { PetsTableShell } from '../Pets/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const PetsTableShell = lazy(
  () => import('@/components/data-table-shell/pets/table-shell')
)

interface LoadPetTableShellProps {
  data: IPet[]
  pageCount: number
}
export default function LoadPetTableShell({
  data,
  pageCount,
}: LoadPetTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <PetsTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
