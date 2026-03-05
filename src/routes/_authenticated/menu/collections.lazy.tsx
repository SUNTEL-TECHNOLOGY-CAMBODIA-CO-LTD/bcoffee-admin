import { createLazyFileRoute } from '@tanstack/react-router'
import CollectionsPage from '@/features/menu/collections/index'

export const Route = createLazyFileRoute('/_authenticated/menu/collections')({
  component: CollectionsPage,
})
