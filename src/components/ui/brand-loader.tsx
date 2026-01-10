import Lottie from 'lottie-react'
import coffeeLoading from '@/assets/coffee_loading.json'
import { cn } from '@/lib/utils'

export function BrandLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-4',
        className
      )}
    >
      <div className='w-48'>
        <Lottie animationData={coffeeLoading} loop={true} />
      </div>
      <p className='animate-pulse text-sm font-medium text-muted-foreground'>
        Brewing Data...
      </p>
    </div>
  )
}
