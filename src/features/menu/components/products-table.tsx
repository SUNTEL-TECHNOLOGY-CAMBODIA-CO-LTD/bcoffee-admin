import { DataTable } from '@/components/custom/data-table'
import { type Product } from '../data/schema'
import { getColumns, type ProductActions } from './products-columns'

interface ProductsTableProps extends Partial<ProductActions> {
  data: Product[]
}

export function ProductsTable({
  data,
  onEdit = () => {},
  onDelete = () => {},
}: ProductsTableProps) {
  const columns = getColumns({ onEdit, onDelete })

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey='name'
      searchPlaceholder='Filter products...'
    />
  )
}
