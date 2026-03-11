import { RefreshCw } from 'lucide-react'

interface Props {
  secondsUntilCheck: number
}

export function VersionCheckIndicator({ secondsUntilCheck }: Props) {
  return (
    <div className='fixed bottom-4 left-4 z-50 flex items-center gap-1.5 rounded-full bg-muted/80 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur-sm'>
      <RefreshCw className='h-3 w-3' />
      <span>{secondsUntilCheck}s</span>
    </div>
  )
}
