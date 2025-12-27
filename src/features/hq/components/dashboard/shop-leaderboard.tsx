import { type ColumnDef } from '@tanstack/react-table'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/custom/data-table'
import { type ShopLeaderboardItem } from '@/features/hq/data/mock-hq-dashboard'

const columns: ColumnDef<ShopLeaderboardItem>[] = [
  {
    accessorKey: 'name',
    header: 'Shop Name',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge variant={status === 'OPEN' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'sales',
    header: ({ column }) => {
      return (
        <div
          className='cursor-pointer hover:text-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Sales (Today)
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('sales'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className='font-medium'>{formatted}</div>
    },
  },
  {
    accessorKey: 'orders',
    header: 'Orders',
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-1'>
          <Star className='h-3 w-3 fill-primary text-primary' />
          <span>{row.getValue('rating')}</span>
        </div>
      )
    },
  },
]

interface ShopLeaderboardProps {
  data: ShopLeaderboardItem[]
}

export function ShopLeaderboard({ data }: ShopLeaderboardProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey='name' // Allow filtering by shop name
      searchPlaceholder='Filter shops...'
    />
  )
}
