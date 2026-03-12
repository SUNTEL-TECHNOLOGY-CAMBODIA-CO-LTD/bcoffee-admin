import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { type InventoryLog } from '@/types/inventory'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<InventoryLog>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Timestamp',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return format(date, 'MMM d, yyyy HH:mm')
    },
  },
  {
    accessorKey: 'ingredientName',
    header: 'Ingredient',
    cell: ({ row }) =>
      row.original.ingredient?.name?.['en'] || 'Unknown Ingredient',
  },
  {
    accessorKey: 'quantityChange',
    header: 'Movement',
    cell: ({ row }) => {
      const change = row.original.quantityChange
      const isPositive = change > 0
      const sign = isPositive ? '+' : ''
      const unit = row.original.ingredient?.unit?.symbol?.['en'] || ''
      const formattedValue = `${sign}${Number(change).toFixed(2)} ${unit}`

      return (
        <span
          className={`font-semibold ${
            isPositive
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {formattedValue}
        </span>
      )
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => {
      const reason = row.original.reason
      let variant: 'default' | 'outline' | 'destructive' | 'secondary' =
        'default'

      switch (reason) {
        case 'SALE':
          variant = 'secondary'
          break
        case 'RESTOCK':
          variant = 'default'
          break
        case 'WASTE':
        case 'DAMAGE':
          variant = 'destructive'
          break
        case 'CORRECTION':
          variant = 'outline'
          break
      }

      return <Badge variant={variant}>{reason}</Badge>
    },
  },
  {
    accessorKey: 'invoiceCode',
    header: 'Reference',
    cell: ({ row }) => {
      const invoice = row.original.invoiceCode
      if (!invoice) return <span className='text-muted-foreground'>-</span>
      return <span className='font-mono text-xs'>{invoice}</span>
    },
  },
  {
    accessorKey: 'staffName',
    header: 'Actor',
    cell: ({ row }) => row.original.staffName || 'System',
  },
]
