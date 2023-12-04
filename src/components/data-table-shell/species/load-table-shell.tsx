'use client'
import { ISpecie } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { SpeciesTableShell } from '../Species/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const SpeciesTableShell = lazy(
  () => import('@/components/data-table-shell/species/table-shell')
)

interface LoadSpecieTableShellProps {
  data: ISpecie[]
  pageCount: number
}
export default function LoadSpecieTableShell({
  data,
  pageCount,
}: LoadSpecieTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <SpeciesTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
