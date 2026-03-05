import { PageTitle } from '@/components/page-title'
import { ReviewsFeed } from '@/features/growth/_components/reviews-feed'
import { MOCK_REVIEWS } from '@/features/growth/data/mock-reviews'

export default function ReviewsPage() {
  return (
    <div className='space-y-6 p-6'>
      <PageTitle
        title='Customer Feedback'
        subtitle='Manage reviews and engage with your customers.'
      />

      <ReviewsFeed initialReviews={MOCK_REVIEWS} />
    </div>
  )
}
