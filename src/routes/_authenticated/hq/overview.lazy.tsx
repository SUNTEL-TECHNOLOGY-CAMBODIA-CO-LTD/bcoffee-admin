import { createLazyFileRoute } from '@tanstack/react-router'
import { HqDashboard } from '@/features/hq/components/dashboard'

export const Route = createLazyFileRoute('/_authenticated/hq/overview')({
  component: HqDashboard,
})
