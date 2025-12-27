import { createLazyFileRoute } from '@tanstack/react-router'
import RosterPage from '@/features/staff/pages/roster-page'

export const Route = createLazyFileRoute('/_authenticated/staff/roster')({
  component: RosterPage,
})
