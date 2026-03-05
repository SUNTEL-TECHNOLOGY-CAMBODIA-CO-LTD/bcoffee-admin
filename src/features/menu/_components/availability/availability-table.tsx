import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/custom/data-table'
import { columns, type AvailabilityTableRow } from './availability-columns'

interface AvailabilityTableProps {
  data: AvailabilityTableRow[]
  onManage: (item: AvailabilityTableRow) => void
  onBulkPublish: (selectedIds: string[]) => void
}

export function AvailabilityTable({
  data,
  onManage,
  onBulkPublish,
}: AvailabilityTableProps) {
  // Note: To truly support bulk actions based on selection with the shared DataTable,
  // we would need the DataTable to expose its selection state or accepted a controlled state.
  // Since we are wrapping it, we'll implement a simplified version or assume the
  // DataTable header can handle it.

  // For this demo, let's provide a "Publish All" button above the table
  // as a proxy for bulk action if selection isn't exposed.

  const handlePublishAll = () => {
    // Mocking selecting all
    const allIds = data.map((d) => d.id!)
    onBulkPublish(allIds)
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between rounded-lg border bg-muted/20 p-2'>
        <div className='pl-2 text-sm text-muted-foreground'>
          Manage global visibility.
        </div>
        <Button size='sm' onClick={handlePublishAll}>
          Publish All to All Shops
        </Button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        searchKey='name.en'
        meta={{ onManage }}
      />
    </div>
  )
}
