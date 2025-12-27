import { createLazyFileRoute } from '@tanstack/react-router'
import OperationsPage from '@/features/operations/pages/operations-page'

export const Route = createLazyFileRoute('/_authenticated/operations/')({
  component: OperationsPage,
})
