'use client'
import { IOwner } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { OwnersTableShell } from '../Owners/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'
import { IUserRestrict } from '@/models/user'

const OwnersTableShell = lazy(
  () => import('@/components/data-table-shell/owners/table-shell')
)

interface LoadOwnerTableShellProps {
  data: IOwner[]
  pageCount: number
  users: IUserRestrict[]
}
export default function LoadOwnerTableShell({
  data,
  pageCount,
  users,
}: LoadOwnerTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <OwnersTableShell data={data} pageCount={pageCount} users={users} />
      </Suspense>
    </>
  )
}
