import { type ColumnDef } from '@tanstack/react-table'
import { Settings2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { type Product } from '@/features/menu/data/schema'

// Enriched type for the table
export interface AvailabilityTableRow extends Product {
  activeShopsCount: number
  totalShopsCount: number
}

export const columns: ColumnDef<AvailabilityTableRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name.en',
    header: 'Product',
    cell: ({ row }) => {
      const name = row.original.name.en
      const sku = row.original.sku
      return (
        <div>
          <div className='font-medium'>{name}</div>
          <div className='text-xs text-muted-foreground'>{sku}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: 'Base Price',
    cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
  },
  {
    id: 'availability',
    header: 'Availability',
    cell: ({ row }) => {
      const { activeShopsCount, totalShopsCount } = row.original
      const percentage =
        totalShopsCount > 0 ? (activeShopsCount / totalShopsCount) * 100 : 0
      let variant: 'default' | 'secondary' | 'destructive' | 'outline' =
        'secondary'

      if (activeShopsCount === 0) variant = 'outline'
      else if (percentage === 100) variant = 'default'
      else variant = 'secondary'

      return (
        <Badge variant={variant}>
          Active in {activeShopsCount}/{totalShopsCount} Shops
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        onManage: (item: AvailabilityTableRow) => void
      }
      return (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => meta.onManage(row.original)}
        >
          <Settings2 className='mr-2 h-4 w-4' />
          Manage
        </Button>
      )
    },
  },
]
