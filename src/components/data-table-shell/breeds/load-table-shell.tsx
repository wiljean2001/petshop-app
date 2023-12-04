'use client'
import { IBreed } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { BreedsTableShell } from '../breeds/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const BreedsTableShell = lazy(
  () => import('@/components/data-table-shell/breeds/table-shell')
)

interface LoadBreedTableShellProps {
  data: IBreed[]
  pageCount: number
}
export default function LoadBreedTableShell({
  data,
  pageCount,
}: LoadBreedTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <BreedsTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
