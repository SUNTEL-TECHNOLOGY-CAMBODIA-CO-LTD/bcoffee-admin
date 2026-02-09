import { type Staff } from '@/types/staff'
import { DataTable } from '@/components/custom/data-table'
import { MOCK_STAFF } from '../data/mock-staff'
import { columns } from './employees-columns'

interface EmployeesTableProps {
  onEdit: (staff: Staff) => void
}

export function EmployeesTable({ onEdit }: EmployeesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={MOCK_STAFF}
      searchKey='fullName'
      searchPlaceholder='Search employees...'
      meta={{ onEdit }}
    />
  )
}
