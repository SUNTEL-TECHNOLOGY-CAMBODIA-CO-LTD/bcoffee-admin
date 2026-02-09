import { toast } from 'sonner'
import {
  useOptionGroups,
  useDeleteOptionGroup,
} from '@/hooks/queries/use-catalog'
import { DataTable } from '@/components/custom/data-table'
import { type ProductOptionGroup } from '../../data/schema'
import { getColumns } from './option-groups-columns.tsx'

interface OptionGroupsTableProps {
  onEdit: (group: ProductOptionGroup) => void
}

export function OptionGroupsTable({ onEdit }: OptionGroupsTableProps) {
  const { data: optionGroups } = useOptionGroups()
  const { mutate: deleteGroup } = useDeleteOptionGroup()

  const handleDelete = (group: ProductOptionGroup) => {
    if (!group.id) return
    deleteGroup(group.id, {
      onSuccess: () => {
        toast.success('Option group deleted')
      },
      onError: () => {
        toast.error('Failed to delete option group')
      },
    })
  }

  // TODO: Update columns to support actions with onDelete and onEdit
  // For now we just pass data
  const tableColumns = getColumns({ onEdit, onDelete: handleDelete })

  return (
    <DataTable
      columns={tableColumns}
      data={(optionGroups as ProductOptionGroup[]) || []}
      searchKey='name'
      searchPlaceholder='Filter option groups...'
    />
  )
}
