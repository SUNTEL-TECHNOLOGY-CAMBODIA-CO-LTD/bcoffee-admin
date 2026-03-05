import { createLazyFileRoute } from '@tanstack/react-router'
import OperationsPage from '@/features/operations/dashboard/index'

export const Route = createLazyFileRoute('/_authenticated/operations/')({
  component: OperationsPage,
})
