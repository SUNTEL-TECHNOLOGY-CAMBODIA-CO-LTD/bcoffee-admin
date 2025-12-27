import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { type CashDrawerSession } from '../../data/cash-drawer-schema'

interface CashDrawerSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: CashDrawerSession | null
}

export function CashDrawerSheet({
  open,
  onOpenChange,
  session,
}: CashDrawerSheetProps) {
  if (!session) return null

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex h-full w-full flex-col p-4 sm:max-w-md'>
        <SheetHeader className='pb-4'>
          <SheetTitle>Drawer Session Details</SheetTitle>
          <SheetDescription>
            ID: <span className='font-mono'>{session.id}</span>
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-hidden'>
          <ScrollArea className='h-full'>
            <div className='space-y-6 pr-6'>
              {/* Header Info */}
              <div className='rounded-lg border p-4 text-sm'>
                <div className='grid gap-2'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Status</span>
                    <Badge
                      variant={
                        session.status === 'OPEN' ? 'default' : 'secondary'
                      }
                    >
                      {session.status}
                    </Badge>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Shop</span>
                    <span className='font-medium'>{session.shopName}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Opened By</span>
                    <span>{session.openedByStaffName}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Started</span>
                    <span className='font-mono'>
                      {format(session.startedAt, 'MMM d, HH:mm')}
                    </span>
                  </div>
                  {session.endedAt && (
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Ended</span>
                      <span className='font-mono'>
                        {format(session.endedAt, 'MMM d, HH:mm')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className='space-y-4 rounded-lg bg-muted/40 p-4'>
                <h4 className='font-medium'>Reconciliation</h4>

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span>Opening Amount</span>
                    <span className='font-mono'>
                      {formatCurrency(session.openingAmount)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>+ Cash Sales</span>
                    <span className='font-mono'>
                      {formatCurrency(session.cashSalesCalculated)}
                    </span>
                  </div>
                  <LinkSeparator />
                  <div className='flex justify-between font-medium'>
                    <span>= Expected In Drawer</span>
                    <span className='font-mono'>
                      {formatCurrency(session.expectedClosingAmount)}
                    </span>
                  </div>

                  {session.status === 'CLOSED' &&
                    session.actualClosingAmount !== undefined && (
                      <>
                        <div className='mt-4 flex justify-between'>
                          <span>Actual Counted</span>
                          <span className='font-mono font-bold'>
                            {formatCurrency(session.actualClosingAmount)}
                          </span>
                        </div>
                        <LinkSeparator />
                        <div className='flex items-center justify-between pt-1'>
                          <span className='font-medium'>Difference</span>
                          <Badge
                            variant={
                              (session.cashDifference || 0) < 0
                                ? 'destructive'
                                : (session.cashDifference || 0) > 0
                                  ? 'default'
                                  : 'outline'
                            }
                            className={
                              (session.cashDifference || 0) > 0
                                ? 'bg-green-600 hover:bg-green-700'
                                : ''
                            }
                          >
                            {formatCurrency(session.cashDifference || 0)}
                          </Badge>
                        </div>
                      </>
                    )}
                </div>
              </div>

              {/* Note */}
              {session.note && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium'>Notes</h4>
                  <div className='rounded-md border bg-muted/20 p-3 text-sm text-muted-foreground italic'>
                    {session.note}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function LinkSeparator() {
  return <div className='my-2 border-t border-dashed' />
}
