import { useState } from 'react'
import { format } from 'date-fns'
import { Clock, DollarSign, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { type ShiftSession } from '../data/shift-schema'
import { CloseShiftDialog } from './close-shift-dialog'

interface ActiveShiftDashboardProps {
  session: ShiftSession
  onCloseShift: (closingBalance: number, note: string) => void
}

export function ActiveShiftDashboard({
  session,
  onCloseShift,
}: ActiveShiftDashboardProps) {
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false)

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val)

  return (
    <div className='flex items-center justify-center p-8'>
      <Card className='w-full max-w-lg'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
            <Clock className='h-8 w-8 text-green-600 dark:text-green-400' />
          </div>
          <CardTitle className='text-2xl text-green-700 dark:text-green-400'>
            Shift In Progress
          </CardTitle>
          <CardDescription>
            Started at {format(session.startedAt, 'h:mm a')} by{' '}
            {session.userName}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-4 rounded-lg bg-muted/40 p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-md border bg-background p-2 shadow-sm'>
                  <DollarSign className='h-4 w-4 text-muted-foreground' />
                </div>
                <span className='font-medium text-muted-foreground'>
                  Opening Balance
                </span>
              </div>
              <span className='font-mono text-lg font-medium'>
                {formatCurrency(session.openingBalance)}
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-md border bg-background p-2 shadow-sm'>
                  <Calculator className='h-4 w-4 text-muted-foreground' />
                </div>
                <span className='font-medium text-muted-foreground'>
                  Est. Cash Sales
                </span>
              </div>
              <span className='font-mono text-lg font-medium'>
                +{formatCurrency(session.cashSales)}
              </span>
            </div>

            <Separator />

            <div className='flex items-center justify-between pt-2'>
              <span className='text-lg font-semibold'>Expected Total</span>
              <span className='font-mono text-2xl font-bold'>
                {formatCurrency(session.expectedTotal)}
              </span>
            </div>
          </div>
          <p className='text-center text-xs text-muted-foreground'>
            Please ensure all cash payments are entered before closing.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            variant='destructive'
            className='w-full'
            size='lg'
            onClick={() => setIsCloseDialogOpen(true)}
          >
            Close Shift
          </Button>
        </CardFooter>
      </Card>

      <CloseShiftDialog
        open={isCloseDialogOpen}
        onOpenChange={setIsCloseDialogOpen}
        expectedTotal={session.expectedTotal}
        onConfirm={onCloseShift}
      />
    </div>
  )
}
