'use client'
import { Suspense, lazy } from 'react'
// import { UsersTableShell } from '../Users/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'
import { ISingUpForm } from '@/models/user'

const UsersTableShell = lazy(
  () => import('@/components/data-table-shell/users/table-shell')
)

interface LoadUserTableShellProps {
  data: ISingUpForm[]
  pageCount: number
}
export default function LoadUserTableShell({
  data,
  pageCount,
}: LoadUserTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <UsersTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
