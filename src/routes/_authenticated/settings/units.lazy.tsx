import { createLazyFileRoute } from '@tanstack/react-router'
import UnitsSettingsPage from '@/features/settings/units/index'

export const Route = createLazyFileRoute('/_authenticated/settings/units')({
  component: UnitsSettingsPage,
})
