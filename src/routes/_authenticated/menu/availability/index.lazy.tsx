import { createLazyFileRoute } from '@tanstack/react-router'
import AvailabilityPage from '@/features/menu/availability/index'

export const Route = createLazyFileRoute('/_authenticated/menu/availability/')({
  component: AvailabilityPage,
})
