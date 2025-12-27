import { createLazyFileRoute } from '@tanstack/react-router'
import PromotionsPage from '@/features/growth/promotions'

export const Route = createLazyFileRoute('/_authenticated/growth/promotions')({
  component: PromotionsPage,
})
