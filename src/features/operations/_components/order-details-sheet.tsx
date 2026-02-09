import { format } from 'date-fns'
import { type Order } from '@/types/orders'
import { Printer, RefreshCcw } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface OrderDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function OrderDetailsSheet({
  open,
  onOpenChange,
  order,
}: OrderDetailsSheetProps) {
  const shopId = useShopStore((state) => state.shopId)

  if (!order) return null

  const handleReprint = () => {
    alert(`Reprinting receipt for ${order.invoiceCode}...`)
  }

  const handleRefund = () => {
    const confirmed = window.confirm(
      `Are you sure you want to refund ${order.invoiceCode}?`
    )
    if (confirmed) {
      alert('Refund processed (Mock).')
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex w-full flex-col p-4 sm:max-w-md'>
        <SheetHeader className='text-center sm:text-center'>
          <SheetTitle>Digital Receipt</SheetTitle>
          <SheetDescription>
            {shopId} • {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='-mx-6 flex-1 px-6'>
          <div className='space-y-6 pt-4'>
            {/* Header Info */}
            <div className='flex flex-col items-center gap-1'>
              <h3 className='text-2xl font-bold tracking-tight'>
                {order.invoiceCode}
              </h3>
              <Badge variant='outline' className='mt-1'>
                {order.type} • {order.paymentStatus}
              </Badge>
              {order.customerName && (
                <span className='mt-1 text-sm text-muted-foreground'>
                  Customer: {order.customerName}
                </span>
              )}
            </div>

            <Separator />

            {/* Items List */}
            <div className='space-y-4'>
              {order.items.map((item) => (
                <div key={item.id} className='text-sm'>
                  <div className='flex justify-between font-medium'>
                    <span>
                      {item.quantity}x {item.name} {item.variant}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  {/* Options */}
                  {item.options && item.options.length > 0 && (
                    <div className='mt-0.5 ml-4 space-y-0.5 text-xs text-muted-foreground'>
                      {item.options.map((opt, idx) => (
                        <div key={idx} className='flex justify-between'>
                          <span>+ {opt.choice}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.notes && (
                    <div className='ml-4 text-xs text-orange-600 italic'>
                      "{item.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Separator />

            {/* Financials */}
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between text-muted-foreground'>
                <span>Subtotal</span>
                <span>${order.subTotal.toFixed(2)}</span>
              </div>
              {order.discounts?.map((d, i) => (
                <div key={i} className='flex justify-between text-green-600'>
                  <span>{d.name}</span>
                  <span>-${d.amount.toFixed(2)}</span>
                </div>
              ))}
              {order.surcharges?.map((s, i) => (
                <div
                  key={i}
                  className='flex justify-between text-muted-foreground'
                >
                  <span>{s.name}</span>
                  <span>+${s.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className='flex justify-between border-t pt-2 text-lg font-bold'>
                <span>Total</span>
                <span>${order.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className='rounded-md bg-muted p-3 text-xs'>
              <div className='flex justify-between'>
                <span className='font-medium text-muted-foreground'>
                  Payment Method
                </span>
                <span>{order.paymentMethodName}</span>
              </div>
              <div className='mt-1 flex justify-between'>
                <span className='font-medium text-muted-foreground'>
                  Status
                </span>
                <span
                  className={
                    order.paymentStatus === 'SUCCESS' ? 'text-green-600' : ''
                  }
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className='flex-col gap-2 pt-2 sm:flex-row sm:justify-between'>
          <Button variant='outline' className='flex-1' onClick={handleReprint}>
            <Printer className='mr-2 h-4 w-4' /> Reprint
          </Button>
          {order.status === 'COMPLETED' &&
            order.paymentStatus === 'SUCCESS' && (
              <Button
                variant='destructive'
                className='flex-1'
                onClick={handleRefund}
              >
                <RefreshCcw className='mr-2 h-4 w-4' /> Issue Refund
              </Button>
            )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
