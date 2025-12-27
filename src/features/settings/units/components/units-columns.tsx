import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { type UnitOfMeasure } from '../data/mock-settings'

export const columns: ColumnDef<UnitOfMeasure>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    cell: ({ row }) => (
      <span className='rounded bg-muted px-2 py-1 font-mono text-xs'>
        {row.original.symbol}
      </span>
    ),
  },
  {
    accessorKey: 'baseMultiplier',
    header: 'Base Multiplier',
  },
]
