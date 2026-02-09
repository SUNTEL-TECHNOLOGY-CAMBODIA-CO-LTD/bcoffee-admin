import { createLazyFileRoute } from '@tanstack/react-router'
import ReviewsPage from '@/features/growth/reviews/index'

export const Route = createLazyFileRoute('/_authenticated/growth/reviews/')({
  component: ReviewsPage,
})
