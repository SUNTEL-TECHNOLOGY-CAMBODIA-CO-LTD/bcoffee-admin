import { createLazyFileRoute } from '@tanstack/react-router'
import CustomersPage from '@/features/growth/customers'

export const Route = createLazyFileRoute('/_authenticated/growth/customers')({
  component: CustomersPage,
})
