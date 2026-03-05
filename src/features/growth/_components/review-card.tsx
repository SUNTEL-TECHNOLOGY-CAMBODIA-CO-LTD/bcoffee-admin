import { formatDistanceToNow } from 'date-fns'
import { type Review } from '@/types/growth'
import { MessageSquare, Star, Store, Tag } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ReviewCardProps {
  review: Review
  onReplyClick: (review: Review) => void
}

export function ReviewCard({ review, onReplyClick }: ReviewCardProps) {
  return (
    <Card className='mb-4'>
      <CardContent className='pt-6'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className='flex items-center gap-2'>
                <span className='font-semibold'>{review.authorName}</span>
                <span className='text-xs text-muted-foreground'>
                  •{' '}
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className='flex items-center text-yellow-500'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-muted-foreground opacity-30'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Badge variant='secondary' className='text-xs'>
            {review.targetType === 'SHOP' ? (
              <Store className='mr-1 h-3 w-3' />
            ) : (
              <Tag className='mr-1 h-3 w-3' />
            )}
            {review.targetName}
          </Badge>
        </div>

        {/* Content */}
        <div className='mt-3 space-y-2'>
          <p className='text-sm leading-relaxed'>{review.content}</p>
          {review.tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {review.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='outline'
                  className='text-xs font-normal text-muted-foreground'
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Reply Section */}
        <div className='mt-4'>
          {review.reply ? (
            <div className='rounded-lg border bg-muted/50 p-3 text-sm'>
              <div className='mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground'>
                <MessageSquare className='h-3 w-3' />
                Response from Store •{' '}
                {formatDistanceToNow(new Date(review.reply.createdAt), {
                  addSuffix: true,
                })}
              </div>
              <p>{review.reply.text}</p>
            </div>
          ) : (
            <div className='flex justify-end'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => onReplyClick(review)}
              >
                <MessageSquare className='mr-2 h-4 w-4' />
                Reply
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
