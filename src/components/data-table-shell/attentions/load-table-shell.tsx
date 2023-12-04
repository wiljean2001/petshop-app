'use client'
import { Attendance } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const AttentionsTableShell = lazy(
  () => import('@/components/data-table-shell/attentions/table-shell')
)

interface LoadAttentionTableShellProps {
  data: Attendance[]
  pageCount: number
}
export default function LoadAttentionTableShell({
  data,
  pageCount,
}: LoadAttentionTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <AttentionsTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
