import { createLazyFileRoute } from '@tanstack/react-router'
import OrdersPage from '@/features/operations/pages/orders-page'

export const Route = createLazyFileRoute('/_authenticated/operations/orders')({
  component: OrdersPage,
})
