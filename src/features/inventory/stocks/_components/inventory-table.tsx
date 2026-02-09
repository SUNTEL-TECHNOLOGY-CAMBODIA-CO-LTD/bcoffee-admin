import { type ShopIngredient } from '@/types/inventory'
import { DataTable } from '@/components/custom/data-table'
import { getColumns } from './columns'

interface InventoryTableProps {
  data: ShopIngredient[]
  onAdjust: (item: ShopIngredient) => void
}

export function InventoryTable({ data, onAdjust }: InventoryTableProps) {
  const columns = getColumns({ onAdjust })

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey='ingredient.name'
      searchPlaceholder='Filter ingredients...'
    />
  )
}
