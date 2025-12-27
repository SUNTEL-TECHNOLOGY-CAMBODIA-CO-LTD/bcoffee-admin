import { createLazyFileRoute } from '@tanstack/react-router'
import AnnouncementsPage from '@/features/growth/announcements'

export const Route = createLazyFileRoute(
  '/_authenticated/growth/announcements'
)({
  component: AnnouncementsPage,
})
