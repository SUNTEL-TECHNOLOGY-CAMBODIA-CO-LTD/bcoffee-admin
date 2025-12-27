import { DataTable } from '@/components/custom/data-table'
import { columns, type ShopIngredient } from './columns'

interface InventoryTableProps {
  data: ShopIngredient[]
}

export function InventoryTable({ data }: InventoryTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey='ingredient.name'
      searchPlaceholder='Filter ingredients...'
    />
  )
}
