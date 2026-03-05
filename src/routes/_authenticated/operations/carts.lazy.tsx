import { createLazyFileRoute } from '@tanstack/react-router'
import { ActiveCartsPage } from '@/features/operations/active-carts/index'

export const Route = createLazyFileRoute('/_authenticated/operations/carts')({
  component: ActiveCartsPage,
})
