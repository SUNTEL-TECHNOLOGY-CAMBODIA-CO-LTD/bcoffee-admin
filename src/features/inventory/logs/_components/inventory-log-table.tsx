import { type InventoryLog } from '@/types/inventory'
import { DataTable } from '@/components/custom/data-table'
import { columns } from './inventory-log-columns'

interface InventoryLogTableProps {
  data: InventoryLog[]
  pageCount?: number
  pagination?: {
    pageIndex: number
    pageSize: number
  }
  onPaginationChange?: (pagination: {
    pageIndex: number
    pageSize: number
  }) => void
}

export function InventoryLogTable({
  data,
  pageCount,
  pagination,
  onPaginationChange,
}: InventoryLogTableProps) {
  if (data.length === 0 && !pagination?.pageIndex) {
    return (
      <div className='flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center'>
        <p className='text-muted-foreground'>
          No inventory movements recorded for this branch yet.
        </p>
      </div>
    )
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      searchKey='ingredientName'
      searchPlaceholder='Filter by ingredient...'
      filters={[
        {
          columnId: 'reason',
          title: 'Event Reason',
          options: [
            { label: 'Sale', value: 'SALE' },
            { label: 'Waste', value: 'WASTE' },
            { label: 'Restock', value: 'RESTOCK' },
            { label: 'Correction', value: 'CORRECTION' },
            { label: 'Damage', value: 'DAMAGE' },
          ],
        },
      ]}
    />
  )
}
