import { createLazyFileRoute } from '@tanstack/react-router'
import ProgramListView from '@/pages/loyalty/program-list.page.tsx'

export const Route = createLazyFileRoute('/_authenticated/loyalty/programs')({
  component: ProgramListView,
})
