import { DataTable } from '@/components/custom/data-table'
import { type Category, MOCK_CATEGORIES } from '../data/mock-categories'
import { columns } from './categories-columns'

interface CategoriesTableProps {
  onEdit: (category: Category) => void
}

export function CategoriesTable({ onEdit }: CategoriesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={MOCK_CATEGORIES}
      searchKey='name'
      searchPlaceholder='Filter categories...'
      meta={{ onEdit }}
    />
  )
}
