import { type ColumnDef } from '@tanstack/react-table'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Surcharge } from '../data/mock-settings'

interface TableMeta {
  onEdit: (surcharge: Surcharge) => void
}

export const columns: ColumnDef<Surcharge>[] = [
  {
    accessorKey: 'name.en',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => <Badge variant='outline'>{row.original.type}</Badge>,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      const val = row.original.value
      const type = row.original.type
      return type === 'PERCENTAGE' ? `${val}%` : `$${val}`
    },
  },
  {
    id: 'isAutoApplied',
    header: 'Auto-Apply',
    cell: ({ row }) => {
      return row.original.isAutoApplied ? (
        <Badge>Yes</Badge>
      ) : (
        <Badge variant='secondary'>No</Badge>
      )
    },
  },
  {
    id: 'isTax',
    header: 'Tax',
    cell: ({ row }) => {
      return row.original.isTax ? <Badge variant='outline'>Tax</Badge> : null
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const active = row.original.isActive
      return (
        <Badge variant={active ? 'default' : 'secondary'}>
          {active ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const surcharge = row.original
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
            <DropdownMenuItem onClick={() => meta?.onEdit(surcharge)}>
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
