import { type ColumnDef } from '@tanstack/react-table'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { getTranslation } from '@/utils/i18n'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Category, MOCK_CATEGORIES } from '../data/mock-categories'

// Define the meta type for our table
interface TableMeta {
  onEdit: (category: Category) => void
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => getTranslation(row.original.name),
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    id: 'parent',
    header: 'Parent Category',
    cell: ({ row }) => {
      const parentId = row.original.parentId
      if (!parentId) return <span className='text-muted-foreground'>-</span>
      const parent = MOCK_CATEGORIES.find((c) => c.id === parentId)
      return parent ? getTranslation(parent.name) : parentId
    },
  },
  {
    accessorKey: 'sortOrder',
    header: 'Sort Order',
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const category = row.original
      const meta = table.options.meta as TableMeta

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => meta?.onEdit(category)}>
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className='text-destructive'>
              <Trash className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
