import LoadingSimpleCard from '@/components/cards/loading-card'
import { DataTableLoading } from '@/components/data-table/data-table-loading'

export default function Loading() {
  // return <LoadingSimpleCard />
  return <DataTableLoading columnCount={5} rowCount={4} />
}
