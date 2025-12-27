import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RosterCalendarProps {
  shopId: string
}

export function RosterCalendar({ shopId }: RosterCalendarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-muted-foreground'>
          Calendar view for {shopId} coming soon...
        </div>
      </CardContent>
    </Card>
  )
}
