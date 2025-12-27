import { createLazyFileRoute } from '@tanstack/react-router'
import { ActiveCartsPage } from '@/features/operations/pages/active-carts-page'

export const Route = createLazyFileRoute('/_authenticated/operations/carts')({
  component: ActiveCartsPage,
})
