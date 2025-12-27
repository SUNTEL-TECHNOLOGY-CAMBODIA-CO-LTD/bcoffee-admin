import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface CloseShiftDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expectedTotal: number
  onConfirm: (closingBalance: number, note: string) => void
}

export function CloseShiftDialog({
  open,
  onOpenChange,
  expectedTotal,
  onConfirm,
}: CloseShiftDialogProps) {
  const [closingBalance, setClosingBalance] = useState<string>('')
  const [note, setNote] = useState('')
  const actual = parseFloat(closingBalance) || 0
  const difference = actual - expectedTotal

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const balance = parseFloat(closingBalance)
    if (!isNaN(balance)) {
      onConfirm(balance, note)
      // Reset form on success / close (handled by parent mostly, but good practice if reused)
    }
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Close Shift & Reconcile</DialogTitle>
          <DialogDescription>
            Please count the actual cash in the drawer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6 py-4'>
          {/* Summary Stats */}
          <div className='space-y-2 rounded-lg bg-muted p-4'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Expected in Drawer:</span>
              <span className='font-medium'>
                {formatCurrency(expectedTotal)}
              </span>
            </div>
            <div className='mt-2 flex items-center justify-between border-t pt-2 text-sm'>
              <span className='font-medium'>Difference:</span>
              <Badge
                variant={difference < 0 ? 'destructive' : 'default'}
                className={cn(
                  difference > 0 && 'bg-green-600 hover:bg-green-700',
                  difference === 0 && 'bg-gray-500 hover:bg-gray-600'
                )}
              >
                {difference > 0 ? '+' : ''}
                {formatCurrency(difference)}
              </Badge>
            </div>
            {difference < 0 && (
              <p className='mt-1 text-xs font-medium text-destructive'>
                Warning: Shortage of {formatCurrency(Math.abs(difference))}
              </p>
            )}
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='closingBalance'>Actual Cash Count</Label>
              <div className='relative'>
                <span className='absolute top-1/2 left-3 -translate-y-1/2 font-medium text-muted-foreground'>
                  $
                </span>
                <Input
                  id='closingBalance'
                  type='number'
                  step='0.01'
                  min='0'
                  placeholder='0.00'
                  className='pl-7'
                  value={closingBalance}
                  onChange={(e) => setClosingBalance(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='note'>Shift Note (Optional)</Label>
              <Textarea
                id='note'
                placeholder='e.g., Left $5 for tip jar, difference due to...'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant={difference < 0 ? 'destructive' : 'default'}
            >
              End Shift & Print Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
