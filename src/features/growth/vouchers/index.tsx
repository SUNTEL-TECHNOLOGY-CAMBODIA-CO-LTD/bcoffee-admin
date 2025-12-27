import { type ColumnDef } from '@tanstack/react-table'
import { type Voucher } from '@/types/growth'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/custom/data-table'
import { PageTitle } from '@/components/page-title'
import { MOCK_VOUCHERS } from '../data/mock-vouchers'

export default function VouchersPage() {
  const columns: ColumnDef<Voucher>[] = [
    {
      accessorKey: 'uniqueCode',
      header: 'Voucher Code',
      cell: ({ row }) => (
        <span className='font-mono font-medium'>{row.original.uniqueCode}</span>
      ),
    },
    {
      accessorKey: 'promotionName',
      header: 'Campaign',
      cell: ({ row }) => (
        <span className='cursor-pointer text-primary hover:underline'>
          {row.original.promotionName}
        </span>
      ),
    },
    {
      accessorKey: 'userPhone',
      header: 'Customer',
      cell: ({ row }) => <span>{row.original.userPhone}</span>,
    },
    {
      accessorKey: 'isRedeemed',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant='secondary'
          className={cn(
            row.original.isRedeemed
              ? 'bg-green-100 text-green-800 hover:bg-green-100'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
          )}
        >
          {row.original.isRedeemed ? 'Redeemed' : 'Unused'}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Issued At',
      cell: ({ row }) => (
        <span className='text-sm text-muted-foreground'>
          {row.original.createdAt}
        </span>
      ),
    },
  ]

  return (
    <div className='flex flex-col gap-4 p-6 lg:gap-6 lg:p-6'>
      <PageTitle title='Vouchers' onClick={() => {}} />
      <DataTable
        columns={columns}
        data={MOCK_VOUCHERS}
        searchKey='uniqueCode'
      />
    </div>
  )
}
