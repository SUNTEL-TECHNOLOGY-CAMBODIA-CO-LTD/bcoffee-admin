import { useState } from 'react'
import { type Order } from '@/types/orders'
import { PageTitle } from '@/components/page-title'
import { OrderDetailsSheet } from '../_components/order-details-sheet'
import { OrderHistoryTable } from '../_components/order-history-table'
import { MOCK_ORDER_HISTORY } from '../data/mock-order-history'

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [openSheet, setOpenSheet] = useState(false)

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order)
    setOpenSheet(true)
  }

  return (
    <div className='space-y-6 p-6'>
      <PageTitle
        title='Order Manager'
        subtitle='View and manage transaction history.'
      />

      <OrderHistoryTable
        data={MOCK_ORDER_HISTORY}
        onRowClick={handleRowClick}
      />

      <OrderDetailsSheet
        open={openSheet}
        onOpenChange={setOpenSheet}
        order={selectedOrder}
      />
    </div>
  )
}
