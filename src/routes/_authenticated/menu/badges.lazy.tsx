import { createLazyFileRoute } from '@tanstack/react-router'
import { BadgesPage } from '@/features/menu/pages/badges-page'

export const Route = createLazyFileRoute('/_authenticated/menu/badges')({
  component: BadgesPage,
})
