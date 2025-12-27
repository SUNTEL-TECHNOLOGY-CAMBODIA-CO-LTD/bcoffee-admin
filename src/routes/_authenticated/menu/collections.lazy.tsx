import { createLazyFileRoute } from '@tanstack/react-router'
import CollectionsPage from '@/features/menu/pages/collections-page'

export const Route = createLazyFileRoute('/_authenticated/menu/collections')({
  component: CollectionsPage,
})
