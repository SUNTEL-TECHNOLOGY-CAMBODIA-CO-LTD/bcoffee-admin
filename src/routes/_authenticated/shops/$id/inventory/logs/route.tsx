import { createFileRoute } from '@tanstack/react-router'
import InventoryLogsPage from '@/features/inventory/logs/index'

export const Route = createFileRoute(
  '/_authenticated/shops/$id/inventory/logs'
)({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page ?? 1),
      limit: Number(search?.limit ?? 20),
    }
  },
  component: ShopInventoryLogsRoute,
})

function ShopInventoryLogsRoute() {
  const { id } = Route.useParams()
  const { page, limit } = Route.useSearch()
  return <InventoryLogsPage shopId={id} page={page} limit={limit} />
}
