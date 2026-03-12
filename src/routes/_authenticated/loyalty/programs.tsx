import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/loyalty/programs')({
  component: Outlet,
})
