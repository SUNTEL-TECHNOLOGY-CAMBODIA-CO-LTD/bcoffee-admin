import { createLazyFileRoute } from '@tanstack/react-router'
import { BadgesPage } from '@/features/menu/badges/index'

export const Route = createLazyFileRoute('/_authenticated/menu/badges')({
  component: BadgesPage,
})
