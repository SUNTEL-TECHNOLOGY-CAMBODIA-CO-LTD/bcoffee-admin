import { createLazyFileRoute } from '@tanstack/react-router'
import IngredientsPage from '@/features/inventory/ingredients-page'

export const Route = createLazyFileRoute(
  '/_authenticated/inventory/ingredients'
)({
  component: IngredientsPage,
})
