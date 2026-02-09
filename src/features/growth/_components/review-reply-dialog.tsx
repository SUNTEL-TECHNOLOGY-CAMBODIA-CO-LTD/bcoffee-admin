import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

interface ReviewReplyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReply: (text: string) => void
  authorName: string
}

export function ReviewReplyDialog({
  open,
  onOpenChange,
  onReply,
  authorName,
}: ReviewReplyDialogProps) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim()) return
    onReply(text)
    setText('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Reply to {authorName}</DialogTitle>
          <DialogDescription>
            Your reply will be visible to the customer and on your public page.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-2'>
          <Textarea
            placeholder='Write your reply here...'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='min-h-[100px]'
          />
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!text.trim()}>
            Send Reply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
