import { createLazyFileRoute } from '@tanstack/react-router'
import LoyaltyPage from '@/features/growth/loyalty'

export const Route = createLazyFileRoute('/_authenticated/growth/loyalty')({
  component: LoyaltyPage,
})
