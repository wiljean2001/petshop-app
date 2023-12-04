'use client'
import { ISchedule } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { SchedulesTableShell } from '../Schedules/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const SchedulesTableShell = lazy(
  () => import('@/components/data-table-shell/schedules/table-shell')
)

interface LoadScheduleTableShellProps {
  data: ISchedule[]
  pageCount: number
}
export default function LoadScheduleTableShell({
  data,
  pageCount,
}: LoadScheduleTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <SchedulesTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
