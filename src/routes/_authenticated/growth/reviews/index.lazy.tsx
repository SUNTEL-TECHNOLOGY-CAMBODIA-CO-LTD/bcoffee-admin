import { createLazyFileRoute } from '@tanstack/react-router'
import ReviewsPage from '@/features/growth/pages/reviews-page'

export const Route = createLazyFileRoute('/_authenticated/growth/reviews/')({
  component: ReviewsPage,
})
