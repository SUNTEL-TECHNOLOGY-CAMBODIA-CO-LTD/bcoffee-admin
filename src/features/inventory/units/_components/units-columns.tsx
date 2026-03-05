import { type ColumnDef } from '@tanstack/react-table'
import { type UnitOfMeasure } from '@/types/inventory'
import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react'
import { getTranslation } from '@/utils/i18n'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table'
import { Button } from '../../../../components/ui/button'

export const columns = (
  onEdit: (unit: UnitOfMeasure) => void,
  onDelete: (unit: UnitOfMeasure) => void
): ColumnDef<UnitOfMeasure>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <span>{getTranslation(row.original.name)}</span>,
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    cell: ({ row }) => (
      <span className='rounded bg-muted px-2 py-1 font-mono text-xs'>
        {getTranslation(row.original.symbol)}
      </span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <span className='text-xs font-medium text-muted-foreground'>
        {row.original.type}
      </span>
    ),
  },
  {
    accessorKey: 'baseMultiplier',
    header: 'Base Multiplier',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const unit = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => onEdit(unit)}>
              <SquarePen className='mr-2 h-4 w-4' />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(unit)}
              className='text-destructive'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
