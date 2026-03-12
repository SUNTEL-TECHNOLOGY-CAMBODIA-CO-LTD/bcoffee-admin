import { useState } from 'react'
import { format, startOfWeek, endOfWeek } from 'date-fns'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/operations/orders'
import { type Order, OrderStatus } from '@/types/api'
import { CalendarIcon, X } from 'lucide-react'
import { type DateRange } from 'react-day-picker'
import { useOrders } from '@/hooks/queries/use-orders'
import { useAppStore } from '@/hooks/use-app-store'
import { BrandLoader } from '@/components/ui/brand-loader'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageTitle } from '@/components/page-title'
import { OrderDetailsSheet } from '../_components/order-details-sheet'
import { OrderHistoryTable } from '../_components/order-history-table'

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.ORDER_PLACED]: 'Order Placed',
  [OrderStatus.CONFIRMED]: 'Confirmed',
  [OrderStatus.PREPARING]: 'Preparing',
  [OrderStatus.READY]: 'Ready',
  [OrderStatus.COMPLETED]: 'Completed',
  [OrderStatus.CANCELLED]: 'Cancelled',
}

export default function OrdersPage() {
  const { page, limit, search, status, startDate, endDate } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const shopId = useAppStore((state) => state.activeShopId)

  const {
    data: orderData,
    isLoading,
    isFetching,
    error,
  } = useOrders({
    shopId: shopId || undefined,
    page,
    limit,
    search,
    status: status as OrderStatus | undefined,
    startDate,
    endDate,
  })

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [openSheet, setOpenSheet] = useState(false)

  const dateRange: DateRange = {
    from: new Date(startDate),
    to: new Date(endDate),
  }

  const currentWeekStart = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    'yyyy-MM-dd'
  )
  const currentWeekEnd = format(
    endOfWeek(new Date(), { weekStartsOn: 1 }),
    'yyyy-MM-dd'
  )

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order)
    setOpenSheet(true)
  }

  const onPaginationChange = (pagination: {
    pageIndex: number
    pageSize: number
  }) => {
    navigate({
      search: (old) => ({
        ...old,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      }),
    })
  }

  const onStatusChange = (value: string) => {
    navigate({
      search: (old) => ({
        ...old,
        page: 1,
        status: value === 'ALL' ? undefined : value,
      }),
    })
  }

  const onDateRangeChange = (range: DateRange | undefined) => {
    navigate({
      search: (old) => ({
        ...old,
        page: 1,
        startDate: range?.from
          ? format(range.from, 'yyyy-MM-dd')
          : currentWeekStart,
        endDate: range?.to ? format(range.to, 'yyyy-MM-dd') : currentWeekEnd,
      }),
    })
  }

  const clearFilters = () => {
    navigate({
      search: (old) => ({
        ...old,
        page: 1,
        status: undefined,
        startDate: currentWeekStart,
        endDate: currentWeekEnd,
      }),
    })
  }

  const hasActiveFilters =
    !!status || startDate !== currentWeekStart || endDate !== currentWeekEnd

  const orders = orderData?.data || []

  if (isLoading) {
    return (
      <div className='flex h-[80vh] w-full items-center justify-center p-6'>
        <BrandLoader />
      </div>
    )
  }

  return (
    <div className='space-y-6 p-6'>
      <PageTitle
        title='Order Manager'
        subtitle='View and manage transaction history.'
      />

      <div className='flex flex-wrap items-center gap-3'>
        <Select value={status ?? 'ALL'} onValueChange={onStatusChange}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='All Statuses' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ALL'>All Statuses</SelectItem>
            {Object.values(OrderStatus).map((s) => (
              <SelectItem key={s} value={s}>
                {ORDER_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='w-60 justify-start gap-2'>
              <CalendarIcon className='h-4 w-4 shrink-0' />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'MMM d, yyyy')} -{' '}
                    {format(dateRange.to, 'MMM d, yyyy')}
                  </>
                ) : (
                  format(dateRange.from, 'MMM d, yyyy')
                )
              ) : (
                <span className='text-muted-foreground'>Pick date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='range'
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button
            variant='ghost'
            size='sm'
            onClick={clearFilters}
            className='gap-1'
          >
            <X className='h-4 w-4' />
            Clear filters
          </Button>
        )}
      </div>

      {error ? (
        <div className='flex h-32 items-center justify-center text-destructive'>
          Failed to load orders.
        </div>
      ) : (
        <div className='relative'>
          {isFetching && !isLoading && (
            <div className='absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/60'>
              <BrandLoader />
            </div>
          )}
          <OrderHistoryTable
            data={orders}
            onRowClick={handleRowClick}
            pageCount={orderData?.meta?.totalPages}
            pagination={{
              pageIndex: page - 1,
              pageSize: limit,
            }}
            onPaginationChange={onPaginationChange}
          />
        </div>
      )}

      <OrderDetailsSheet
        open={openSheet}
        onOpenChange={setOpenSheet}
        order={selectedOrder}
      />
    </div>
  )
}
