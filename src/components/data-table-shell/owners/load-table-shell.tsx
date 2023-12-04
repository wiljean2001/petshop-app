'use client'
import { IOwner } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { OwnersTableShell } from '../Owners/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const OwnersTableShell = lazy(
  () => import('@/components/data-table-shell/owners/table-shell')
)

interface LoadOwnerTableShellProps {
  data: IOwner[]
  pageCount: number
}
export default function LoadOwnerTableShell({
  data,
  pageCount,
}: LoadOwnerTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <OwnersTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
