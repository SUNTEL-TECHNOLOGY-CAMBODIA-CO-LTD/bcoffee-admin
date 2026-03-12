import { useNavigate } from '@tanstack/react-router'
import { Gift, Users, Trophy } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ProgramType } from '@/types/loyalty'

interface ProgramCreateSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProgramCreateSheet({
  open,
  onOpenChange,
}: ProgramCreateSheetProps) {
  const navigate = useNavigate()

  const handleSelect = (type: ProgramType) => {
    onOpenChange(false)
    navigate({
      to: '/loyalty/programs/create',
      search: { type },
    })
  }

  const types = [
    {
      type: ProgramType.NEW_USER,
      title: 'Welcome Reward',
      description: 'Reward new users upon registration.',
      icon: <Trophy className='h-8 w-8 text-primary' />,
    },
    {
      type: ProgramType.STAMP_CARD,
      title: 'Stamp Card',
      description: 'Digital stamp card for frequent purchases.',
      icon: <Gift className='h-8 w-8 text-primary' />,
    },
    {
      type: ProgramType.REFERRAL,
      title: 'Referral Program',
      description: 'Reward both referrer and referee for invitations.',
      icon: <Users className='h-8 w-8 text-primary' />,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Select Program Type</DialogTitle>
          <DialogDescription>
            Choose the type of loyalty program you want to create.
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-3'>
          {types.map((t) => (
            <div
              key={t.type}
              className='flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors hover:bg-accent'
              onClick={() => handleSelect(t.type)}
            >
              {t.icon}
              <div className='font-semibold'>{t.title}</div>
              <div className='text-xs text-muted-foreground'>{t.description}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
