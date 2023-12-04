'use client'
import { IService } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { ServicesTableShell } from '../Services/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const ServicesTableShell = lazy(
  () => import('@/components/data-table-shell/services/table-shell')
)

interface LoadServiceTableShellProps {
  data: IService[]
  pageCount: number
}
export default function LoadServiceTableShell({
  data,
  pageCount,
}: LoadServiceTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <ServicesTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
