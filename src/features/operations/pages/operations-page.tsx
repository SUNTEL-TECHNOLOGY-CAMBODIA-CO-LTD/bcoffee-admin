import { useState, useEffect } from 'react'
import { type Order, type OrderStatus } from '@/types/orders'
import { RefreshCcw } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { KanbanBoard } from '@/features/operations/components/kanban-board'
import { MOCK_ORDERS } from '@/features/operations/data/mock-orders'

export default function OperationsPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const shopId = useShopStore((state) => state.shopId)

  // Simulating local state updates
  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
          : o
      )
    )
  }

  // Effect to simulate auto-refresh (just logging for now)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoRefresh) {
      interval = setInterval(() => {
        console.log('Refreshing orders...')
        // In real app: refetch()
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [autoRefresh])

  return (
    <div className='flex h-screen flex-col overflow-hidden bg-background'>
      {/* Header */}
      <header className='flex h-16 shrink-0 items-center justify-between border-b bg-card px-6'>
        <div className='flex items-center gap-4'>
          <h1 className='text-xl font-bold tracking-tight'>
            Live KDS - {shopId || 'Unknown Shop'}
          </h1>
          <span className='rounded bg-muted px-2 py-1 text-xs text-muted-foreground'>
            v1.0.0
          </span>
        </div>

        <div className='flex items-center gap-6'>
          <div className='flex items-center space-x-2'>
            <Switch
              id='auto-refresh'
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label
              htmlFor='auto-refresh'
              className='flex cursor-pointer items-center gap-2'
            >
              {autoRefresh && <RefreshCcw className='h-3 w-3 animate-spin' />}
              Auto-Refresh
            </Label>
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setOrders(MOCK_ORDERS)}
          >
            Reset Demo
          </Button>
        </div>
      </header>

      {/* Board Content */}
      <main className='flex-1 overflow-hidden pt-6'>
        <KanbanBoard orders={orders} onStatusChange={handleStatusChange} />
      </main>
    </div>
  )
}
