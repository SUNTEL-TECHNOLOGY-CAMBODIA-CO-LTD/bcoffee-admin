import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { getTranslation } from '@/utils/i18n'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type ProductOptionGroup } from '../../data/schema'

interface OptionGroupActions {
  onEdit: (group: ProductOptionGroup) => void
  onDelete: (group: ProductOptionGroup) => void
}

export const getColumns = ({
  onEdit,
  onDelete,
}: OptionGroupActions): ColumnDef<ProductOptionGroup>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => getTranslation(row.original.name),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      let className = ''
      if (type === 'VARIANT') className = 'bg-blue-500 hover:bg-blue-600'
      if (type === 'MODIFIER') className = 'bg-orange-500 hover:bg-orange-600'
      if (type === 'ADDON') className = 'bg-green-500 hover:bg-green-600'

      return <Badge className={className}>{type}</Badge>
    },
  },
  {
    id: 'rules',
    header: 'Rules',
    cell: ({ row }) => {
      const { minSelect, maxSelect } = row.original
      return (
        <span className='text-sm text-muted-foreground'>
          Min: {minSelect} / Max: {maxSelect}
        </span>
      )
    },
  },
  {
    accessorKey: 'choices',
    header: 'Choices',
    cell: ({ row }) => row.original.choices?.length || 0,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.sku)}
            >
              Copy SKU
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-destructive'
              onClick={() => onDelete(row.original)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
