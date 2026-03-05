import { useState, useMemo } from 'react'
import { type Review } from '@/types/growth'
import { useShopStore } from '@/stores/shop-store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ReviewCard } from './review-card'
import { ReviewReplyDialog } from './review-reply-dialog'

interface ReviewsFeedProps {
  initialReviews: Review[]
}

export function ReviewsFeed({ initialReviews }: ReviewsFeedProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isReplyOpen, setIsReplyOpen] = useState(false)

  // Filters
  const [statusFilter, setStatusFilter] = useState('all') // all, replied, unreplied
  const [ratingFilter, setRatingFilter] = useState('all') // all, 5, 4, 3, 2, 1
  const shopId = useShopStore((state) => state.shopId)

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Shop Filter (Strict)
      // if (shopId && review.shopId !== shopId) return false

      // Status Filter
      if (statusFilter === 'replied' && !review.reply) return false
      if (statusFilter === 'unreplied' && review.reply) return false

      // Rating Filter
      if (ratingFilter !== 'all' && review.rating !== parseInt(ratingFilter))
        return false

      return true
    })
  }, [reviews, shopId, statusFilter, ratingFilter])

  const handleReplyClick = (review: Review) => {
    setSelectedReview(review)
    setIsReplyOpen(true)
  }

  const handleSendReply = (text: string) => {
    if (!selectedReview) return

    // Mock Update
    const updated = reviews.map((r) => {
      if (r.id === selectedReview.id) {
        return {
          ...r,
          reply: {
            text,
            createdAt: new Date().toISOString(),
          },
        }
      }
      return r
    })

    setReviews(updated)
  }

  return (
    <div className='mx-auto'>
      {/* Filters Toolbar */}
      <div className='mb-6 flex flex-wrap gap-4 rounded-lg border bg-muted/20 p-4'>
        {/* Status Filter */}
        <div className='max-w-[150px]'>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='unreplied'>Unreplied</SelectItem>
              <SelectItem value='replied'>Replied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className='max-w-[150px]'>
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger>
              <SelectValue placeholder='Rating' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Ratings</SelectItem>
              <SelectItem value='5'>5 Stars</SelectItem>
              <SelectItem value='4'>4 Stars</SelectItem>
              <SelectItem value='3'>3 Stars</SelectItem>
              <SelectItem value='2'>2 Stars</SelectItem>
              <SelectItem value='1'>1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex-1 self-center text-right text-sm text-muted-foreground'>
          {filteredReviews.length} reviews found
        </div>
      </div>

      {/* Feed */}
      <div className='space-y-4'>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReplyClick={handleReplyClick}
            />
          ))
        ) : (
          <div className='py-12 text-center text-muted-foreground'>
            No reviews found matching filters.
          </div>
        )}
      </div>

      <ReviewReplyDialog
        open={isReplyOpen}
        onOpenChange={setIsReplyOpen}
        onReply={handleSendReply}
        authorName={selectedReview?.authorName || 'Customer'}
      />
    </div>
  )
}
