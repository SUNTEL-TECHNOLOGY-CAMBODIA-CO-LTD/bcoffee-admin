import { useState } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { DiscountType, type Promotion } from '@/types/growth'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DataTable } from '@/components/custom/data-table'
import { PageTitle } from '@/components/page-title'
import { MOCK_PROMOTIONS } from '../data/mock-promotions'
import { PromotionSheet } from './components/promotion-sheet'

export default function PromotionsPage() {
  const [open, setOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  )

  const columns: ColumnDef<Promotion>[] = [
    {
      accessorKey: 'name',
      header: 'Campaign',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <span className='font-medium'>{row.original.name.en}</span>
          {row.original.code && (
            <span className='font-mono text-xs text-muted-foreground'>
              {row.original.code}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Discount',
      cell: ({ row }) => {
        const type = row.original.type
        const value = row.original.value
        return (
          <Badge variant='outline'>
            {type === DiscountType.PERCENTAGE
              ? `${value}% OFF`
              : `$${value.toFixed(2)} OFF`}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'scope',
      header: 'Scope',
      cell: ({ row }) => (
        <Badge variant='secondary'>{row.original.scope}</Badge>
      ),
    },
    {
      accessorKey: 'timeline',
      header: 'Timeline',
      cell: ({ row }) => {
        if (!row.original.startDate && !row.original.endDate) return '-'
        return (
          <div className='flex flex-col text-xs'>
            <span>{row.original.startDate || 'Now'}</span>
            <span className='text-muted-foreground'>to</span>
            <span>{row.original.endDate || 'Forever'}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'budget',
      header: 'Budget',
      cell: ({ row }) => {
        const limit = row.original.budgetLimitAmount
        const burned = row.original.totalAmountBurned
        if (!limit) return <span className='text-xs'>Unlimited</span>

        const percent = Math.min((burned / limit) * 100, 100)
        return (
          <div className='w-[120px] space-y-1'>
            <Progress value={percent} className='h-2' />
            <div className='flex justify-between text-[10px] text-muted-foreground'>
              <span>${burned}</span>
              <span>${limit}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          className={cn(row.original.isActive ? 'bg-green-500' : 'bg-gray-400')}
        >
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            setSelectedPromotion(row.original)
            setOpen(true)
          }}
        >
          Edit
        </Button>
      ),
    },
  ]

  return (
    <div className='flex flex-col gap-4 p-6 lg:gap-6 lg:p-6'>
      <PageTitle
        title='Promotions'
        onClick={() => {
          setSelectedPromotion(null)
          setOpen(true)
        }}
      />

      <DataTable columns={columns} data={MOCK_PROMOTIONS} searchKey='name' />

      <PromotionSheet
        open={open}
        onOpenChange={setOpen}
        initialData={selectedPromotion}
      />
    </div>
  )
}
