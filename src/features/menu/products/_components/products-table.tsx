import { DataTable } from '@/components/custom/data-table'
import { type Product, type Category } from '../data/schema'
import { getColumns, type ProductActions } from './products-columns'

interface ProductsTableProps extends Partial<ProductActions> {
  data: Product[]
  categories: Category[]
}

export function ProductsTable({
  data,
  categories,
  onEdit = () => {},
  onDelete = () => {},
}: ProductsTableProps) {
  const columns = getColumns({ onEdit, onDelete, categories })

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey='name'
      searchPlaceholder='Filter products...'
    />
  )
}
