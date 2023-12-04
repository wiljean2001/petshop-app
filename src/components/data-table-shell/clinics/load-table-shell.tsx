'use client'
import { IClinic } from '@/models/schemas.d'
import { Suspense, lazy } from 'react'
// import { ClinicsTableShell } from '../Clinics/table-shell'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

const ClinicsTableShell = lazy(
  () => import('@/components/data-table-shell/clinics/table-shell')
)

interface LoadClinicTableShellProps {
  data: IClinic[]
  pageCount: number
}
export default function LoadClinicTableShell({
  data,
  pageCount,
}: LoadClinicTableShellProps) {
  return (
    <>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={4} />}>
        <ClinicsTableShell data={data} pageCount={pageCount} />
      </Suspense>
    </>
  )
}
