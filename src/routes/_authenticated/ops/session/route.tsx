import { createFileRoute } from '@tanstack/react-router'
import { OperationsSessionPage } from '@/routes/_authenticated/ops/session/index'

export const Route = createFileRoute('/_authenticated/ops/session')({
  component: OperationsSessionPage,
})
