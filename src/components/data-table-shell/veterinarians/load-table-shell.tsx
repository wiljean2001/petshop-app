'use client'
import { IVeterinarian } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { VeterinariansTableShell } from '../Veterinarians/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const VeterinariansTableShell = lazy(
  () => import('@/components/data-table-shell/veterinarians/table-shell')
)

interface LoadVeterinarianTableShellProps {
  data: IVeterinarian[]
  pageCount: number
}
export default function LoadVeterinarianTableShell({
  data,
  pageCount,
}: LoadVeterinarianTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <VeterinariansTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
