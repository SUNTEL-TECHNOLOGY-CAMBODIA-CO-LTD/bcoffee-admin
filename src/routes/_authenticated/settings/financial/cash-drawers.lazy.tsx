import { createLazyFileRoute } from '@tanstack/react-router'
import { CashDrawersPage } from '@/features/settings/financial/cash-drawers-page'

export const Route = createLazyFileRoute(
  '/_authenticated/settings/financial/cash-drawers'
)({
  component: CashDrawersPage,
})
