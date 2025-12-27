import { DataTable } from '@/components/custom/data-table'
import { MOCK_PRODUCTS } from '../data/mock-products'
import { columns } from './products-columns'

export function ProductsTable() {
  return (
    <DataTable
      columns={columns}
      data={MOCK_PRODUCTS}
      searchKey='name'
      searchPlaceholder='Filter products...'
    />
  )
}
