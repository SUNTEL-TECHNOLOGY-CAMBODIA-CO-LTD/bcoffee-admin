import { createLazyFileRoute } from '@tanstack/react-router'
import OrdersPage from '@/features/operations/orders/index'

export const Route = createLazyFileRoute('/_authenticated/operations/orders')({
  component: OrdersPage,
})
