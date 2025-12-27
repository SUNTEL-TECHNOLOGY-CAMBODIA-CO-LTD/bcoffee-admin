import { format, intervalToDuration } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/custom/data-table'
import { type CashDrawerSession } from '../../data/cash-drawer-schema'

interface CashDrawerTableProps {
  data: CashDrawerSession[]
  onViewDetails: (session: CashDrawerSession) => void
}

export function CashDrawerTable({ data, onViewDetails }: CashDrawerTableProps) {
  const columns: ColumnDef<CashDrawerSession>[] = [
    {
      accessorKey: 'startedAt',
      header: 'Date',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>
            {format(row.original.startedAt, 'MMM d, yyyy')}
          </span>
          <span className='text-xs text-muted-foreground'>
            {format(row.original.startedAt, 'HH:mm')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'shopName',
      header: 'Shop',
    },
    {
      accessorKey: 'openedByStaffName',
      header: 'Staff',
    },
    {
      id: 'duration',
      header: 'Duration',
      cell: ({ row }) => {
        const { startedAt, endedAt } = row.original
        if (!endedAt)
          return <span className='text-xs text-muted-foreground'>Ongoing</span>

        const duration = intervalToDuration({ start: startedAt, end: endedAt })
        // Simplified formatting
        const text =
          [
            duration.hours ? `${duration.hours}h` : '',
            duration.minutes ? `${duration.minutes}m` : '',
          ]
            .filter(Boolean)
            .join(' ') || '< 1m'

        return <span className='text-sm'>{text}</span>
      },
    },
    {
      accessorKey: 'cashDifference',
      header: 'Difference',
      cell: ({ row }) => {
        const diff = row.original.cashDifference
        const status = row.original.status

        if (status === 'OPEN')
          return <span className='text-xs text-muted-foreground'>-</span>
        if (diff === undefined)
          return <span className='text-muted-foreground'>-</span>

        const isZero = Math.abs(diff) < 0.01
        const isNegative = diff < 0

        return (
          <Badge
            variant='outline'
            className={
              isZero
                ? 'border-transparent bg-muted text-muted-foreground hover:bg-muted'
                : isNegative
                  ? 'border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20'
                  : 'border-green-200 bg-green-100 text-green-700 hover:bg-green-200 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400'
            }
          >
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              signDisplay: 'always',
            }).format(diff)}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === 'OPEN' ? 'default' : 'secondary'}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => onViewDetails(row.original)}
        >
          <Eye className='mr-2 h-4 w-4' />
          Details
        </Button>
      ),
    },
  ]

  return (
    <DataTable columns={columns} data={data} searchKey='openedByStaffName' />
  ) // Filter by staff
}
