import { createLazyFileRoute } from '@tanstack/react-router'
import AvailabilityPage from '@/features/menu/pages/availability-page'

export const Route = createLazyFileRoute('/_authenticated/menu/availability/')({
  component: AvailabilityPage,
})
