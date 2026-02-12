import { useFormContext } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ActionSection } from './action-section'
import { StrategySection } from './strategy-section'
import { TriggerSection } from './trigger-section'

export function PromotionBuilder() {
  const form = useFormContext()
  const triggerTargetIds = form.watch('metadata.trigger.targetIds') || []
  const actionApplyToId = form.watch('metadata.action.applyToId')

  const hasCircularLogic =
    actionApplyToId && triggerTargetIds.includes(actionApplyToId)

  return (
    <div className='flex flex-col gap-6'>
      {hasCircularLogic && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Warning: Circular Logic Detected</AlertTitle>
          <AlertDescription>
            The trigger condition depends on the same item that is being
            discounted. This may cause an infinite loop.
          </AlertDescription>
        </Alert>
      )}

      <TriggerSection />
      <ActionSection />
      <StrategySection />

      <div className='rounded-md bg-muted p-4'>
        <p className='mb-2 text-xs font-semibold text-muted-foreground'>
          DEV MODE: JSON PREVIEW
        </p>
        <pre className='overflow-x-auto text-[10px]'>
          {JSON.stringify(form.watch('metadata'), null, 2)}
        </pre>
      </div>
    </div>
  )
}
