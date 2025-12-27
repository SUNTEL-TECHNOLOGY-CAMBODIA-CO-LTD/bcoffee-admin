import { DataTable } from '@/components/custom/data-table'
import { MOCK_OPTION_GROUPS } from '../data/mock-options'
import { columns } from './option-groups-columns'

export function OptionGroupsTable() {
  return (
    <DataTable
      columns={columns}
      data={MOCK_OPTION_GROUPS}
      searchKey='name'
      searchPlaceholder='Filter option groups...'
    />
  )
}
