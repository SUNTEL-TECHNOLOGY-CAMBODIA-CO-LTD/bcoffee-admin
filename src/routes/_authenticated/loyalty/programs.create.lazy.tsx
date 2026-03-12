import { createLazyFileRoute } from '@tanstack/react-router'
import ProgramCreateView from '@/pages/loyalty/program-create.page.tsx'

export const Route = createLazyFileRoute(
  '/_authenticated/loyalty/programs/create'
)({
  component: ProgramCreateView,
})
