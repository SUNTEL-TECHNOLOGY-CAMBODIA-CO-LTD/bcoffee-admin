import { createLazyFileRoute } from '@tanstack/react-router'
import RosterPage from '@/features/staff/roster/index'

export const Route = createLazyFileRoute('/_authenticated/staff/roster')({
  component: RosterPage,
})
