import { createLazyFileRoute } from '@tanstack/react-router'
import UnitsSettingsPage from '@/features/inventory/units/index'

export const Route = createLazyFileRoute('/_authenticated/inventory/units')({
  component: UnitsSettingsPage,
})
