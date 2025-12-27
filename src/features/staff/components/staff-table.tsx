import { type Staff } from '@/types/staff'
import { DataTable } from '@/components/custom/data-table'
import { MOCK_STAFF } from '../data/mock-staff'
import { columns } from './columns'

interface StaffTableProps {
  onEdit: (staff: Staff) => void
}

export function StaffTable({ onEdit }: StaffTableProps) {
  return (
    <DataTable
      columns={columns}
      data={MOCK_STAFF}
      searchKey='fullName'
      searchPlaceholder='Search staff...'
      meta={{ onEdit }}
    />
  )
}
