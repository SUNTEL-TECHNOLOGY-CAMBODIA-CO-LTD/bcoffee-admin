import { createFileRoute } from '@tanstack/react-router'
import Inventory from '@/features/inventory/stocks/index'

export const Route = createFileRoute('/_authenticated/inventory/stock')({
  component: Inventory,
})
