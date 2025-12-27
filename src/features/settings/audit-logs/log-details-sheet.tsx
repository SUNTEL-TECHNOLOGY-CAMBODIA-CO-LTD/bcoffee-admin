import { format } from 'date-fns'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { type AuditLog } from '../data/audit-log-schema'

interface LogDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  log: AuditLog | null
}

export function LogDetailsSheet({
  open,
  onOpenChange,
  log,
}: LogDetailsSheetProps) {
  if (!log) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderDetails = (details: Record<string, any>) => {
    // Check for explicit diff structure (oldValue, newValue) key pattern
    // Case 1: The details object ITSELF has oldValue/newValue (unlikely for complex objects, but possible for simple field updates)
    // Case 2: We iterate through keys and see if they denote a change.
    // The prompt says: "If the JSON contains oldValue and newValue, render a simple Diff View"

    const hasDiffKeys = 'oldValue' in details && 'newValue' in details

    if (hasDiffKeys) {
      return (
        <div className='space-y-2 rounded-md bg-muted/30 p-4'>
          <h4 className='mb-2 text-sm font-medium'>Change Details</h4>
          {details.field && (
            <div className='mb-2 text-sm font-medium'>
              Field: <span className='font-mono'>{details.field}</span>
            </div>
          )}
          <div className='flex items-center gap-3 text-sm'>
            <span className='text-muted-foreground line-through decoration-destructive'>
              {JSON.stringify(details.oldValue)}
            </span>
            <span>→</span>
            <span className='font-medium text-green-600'>
              {JSON.stringify(details.newValue)}
            </span>
          </div>
        </div>
      )
    }

    return (
      <div className='overflow-x-auto rounded-md bg-muted/50 p-4'>
        <pre className='font-mono text-xs whitespace-pre-wrap'>
          {JSON.stringify(details, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex h-full w-full flex-col p-4 sm:max-w-md'>
        <SheetHeader className='pb-4'>
          <SheetTitle>Audit Log Details</SheetTitle>
          <SheetDescription>
            Action ID: <span className='font-mono'>{log.id}</span>
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-hidden'>
          <ScrollArea className='h-full'>
            <div className='space-y-6 pr-6'>
              {/* Header Info */}
              <div className='grid gap-4 rounded-lg border p-4 text-sm'>
                <div className='grid grid-cols-2 gap-2'>
                  <span className='text-muted-foreground'>Timestamp</span>
                  <span className='text-right font-mono'>
                    {format(log.createdAt, 'MMM d, HH:mm:ss')}
                  </span>

                  <span className='text-muted-foreground'>Actor</span>
                  <span className='text-right font-medium'>
                    {log.actorName}
                  </span>

                  <span className='text-muted-foreground'>Action</span>
                  <div className='text-right'>
                    <Badge
                      variant={
                        log.actionType === 'DELETE'
                          ? 'destructive'
                          : log.actionType === 'UPDATE'
                            ? 'default'
                            : log.actionType === 'CREATE'
                              ? 'outline'
                              : 'secondary'
                      }
                    >
                      {log.actionType}
                    </Badge>
                  </div>

                  <span className='text-muted-foreground'>Resource</span>
                  <span className='text-right break-words'>
                    {log.targetResource}
                  </span>
                </div>
              </div>

              {/* Authorization Warning */}
              {log.authorizedByStaffId && (
                <Alert variant='destructive'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Manager Authorized</AlertTitle>
                  <AlertDescription>
                    This action was authorized by:{' '}
                    <span className='font-semibold'>
                      {log.authorizedByName}
                    </span>
                  </AlertDescription>
                </Alert>
              )}

              {/* Payload / Details */}
              <div>
                <h3 className='mb-2 text-sm font-medium'>Action Payload</h3>
                {renderDetails(log.details)}
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
