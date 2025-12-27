import { useState } from 'react'
import { Banknote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface StartShiftCardProps {
  onStartShift: (openingBalance: number) => void
}

export function StartShiftCard({ onStartShift }: StartShiftCardProps) {
  const [openingBalance, setOpeningBalance] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const balance = parseFloat(openingBalance)
    if (!isNaN(balance)) {
      onStartShift(balance)
    }
  }

  return (
    <div className='flex items-center justify-center p-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
            <Banknote className='h-6 w-6 text-primary' />
          </div>
          <CardTitle className='text-xl'>Start Shift</CardTitle>
          <CardDescription>
            No active shift found. Please count the cash in the drawer to open
            the register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='openingBalance'>Opening Cash Balance</Label>
              <div className='relative'>
                <span className='absolute top-1/2 left-3 -translate-y-1/2 font-medium text-muted-foreground'>
                  $
                </span>
                <Input
                  id='openingBalance'
                  type='number'
                  step='0.01'
                  min='0'
                  placeholder='0.00'
                  className='pl-7 text-lg'
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>
            <Button
              type='submit'
              className='w-full'
              size='lg'
              disabled={!openingBalance}
            >
              Open Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
