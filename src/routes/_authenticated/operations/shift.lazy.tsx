import { createLazyFileRoute } from '@tanstack/react-router'
import { ShiftPage } from '@/features/operations/shift/shift-page'

export const Route = createLazyFileRoute('/_authenticated/operations/shift')({
  component: ShiftPage,
})
