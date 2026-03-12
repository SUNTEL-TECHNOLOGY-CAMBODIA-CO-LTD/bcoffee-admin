import { createLazyFileRoute } from '@tanstack/react-router'
import ProgramEditView from '@/pages/loyalty/program-edit.page.tsx'

export const Route = createLazyFileRoute('/_authenticated/loyalty/programs/$id')({
  component: ProgramEditView,
})
