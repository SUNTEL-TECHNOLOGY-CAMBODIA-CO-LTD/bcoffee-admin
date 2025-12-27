import { Plus } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
  title: string
  subtitle?: string
  buttonLabel?: string
  onClick?: () => void
}

export function PageTitle({
  title,
  subtitle,
  buttonLabel = 'Add',
  onClick,
}: Props) {
  return (
    <div className='mb-6 flex items-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground'>{subtitle}</p>
      </div>
      {onClick && (
        <Button onClick={onClick}>
          <Plus className='mr-2 h-4 w-4' /> {buttonLabel}
        </Button>
      )}
    </div>
  )
}
