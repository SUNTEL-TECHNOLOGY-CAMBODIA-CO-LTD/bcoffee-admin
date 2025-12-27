import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table'

export type ShopIngredient = {
  id: string
  shopId: string
  ingredientId: string
  currentStock: number
  price: number
  lowStockThreshold: number
  ingredient: {
    name: string
    sku: string
    unit: string
  }
}

export const columns: ColumnDef<ShopIngredient>[] = [
  {
    accessorKey: 'ingredient.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
  },
  {
    accessorKey: 'ingredient.sku',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SKU' />
    ),
  },
  {
    accessorKey: 'currentStock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stock' />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue('currentStock') as number
      const unit = row.original.ingredient.unit

      let formattedQuantity = `${quantity} ${unit}`

      if (unit === 'ml' && quantity > 1000) {
        formattedQuantity = `${(quantity / 1000).toFixed(1)} Liters`
      } else if (unit === 'g' && quantity > 1000) {
        formattedQuantity = `${(quantity / 1000).toFixed(1)} kg`
      }

      return <div className='font-medium'>{formattedQuantity}</div>
    },
  },
  {
    id: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const currentStock = row.original.currentStock
      const lowStockThreshold = row.original.lowStockThreshold
      const isLowStock = currentStock <= lowStockThreshold

      return (
        <Badge variant={isLowStock ? 'destructive' : 'outline'}>
          {isLowStock ? 'Low Stock' : 'Good'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)

      return <div>{formatted}</div>
    },
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
              onClick={() => navigator.clipboard.writeText(row.original.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Adjust Stock</DropdownMenuItem>
            <DropdownMenuItem>View History</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
