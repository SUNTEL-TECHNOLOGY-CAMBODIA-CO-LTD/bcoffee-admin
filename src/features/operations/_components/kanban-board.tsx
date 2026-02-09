import { type Order, type OrderStatus } from '@/types/orders'
import { ScrollArea } from '@/components/ui/scroll-area'
import { OrderCard } from './order-card'

interface KanbanBoardProps {
  orders: Order[]
  onStatusChange: (id: string, status: OrderStatus) => void
}

const COLUMNS: { id: string; label: string; statuses: OrderStatus[] }[] = [
  { id: 'new', label: 'New Orders', statuses: ['PENDING', 'CONFIRMED'] },
  { id: 'preparing', label: 'Preparing', statuses: ['PREPARING'] },
  { id: 'ready', label: 'Ready for Pickup', statuses: ['READY'] },
  { id: 'completed', label: 'Completed', statuses: ['COMPLETED'] },
]

export function KanbanBoard({ orders, onStatusChange }: KanbanBoardProps) {
  const getOrdersByStatus = (statuses: OrderStatus[]) => {
    return orders
      .filter((o) => statuses.includes(o.status))
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) // Oldest first
  }

  return (
    <div className='flex h-full flex-1 overflow-x-auto pb-4'>
      {/* Using a flex container with min-width for columns to enable horizontal scroll */}
      <div className='flex h-full min-w-max gap-4 px-6'>
        {COLUMNS.map((col) => {
          const colOrders = getOrdersByStatus(col.statuses)
          // Limit completed column to last 10
          const displayOrders =
            col.id === 'completed'
              ? colOrders.reverse().slice(0, 10) // Show newest completed at top
              : colOrders

          return (
            <div
              key={col.id}
              className='flex w-80 flex-col rounded-lg border bg-muted/50 p-4'
            >
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>{col.label}</h3>
                <span className='rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary'>
                  {colOrders.length}
                </span>
              </div>

              <ScrollArea className='h-full flex-1'>
                <div className='flex flex-col gap-4 pr-3 pb-2'>
                  {displayOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusChange={onStatusChange}
                    />
                  ))}
                  {displayOrders.length === 0 && (
                    <div className='flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground'>
                      No orders
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          )
        })}
      </div>
    </div>
  )
}
