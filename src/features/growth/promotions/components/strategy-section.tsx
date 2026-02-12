import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

export function StrategySection() {
  const form = useFormContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>Strategy & Rules</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <FormField
          control={form.control}
          name='metadata.priority'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                <FormLabel>Priority (0-100)</FormLabel>
                <span className='text-sm text-muted-foreground'>
                  {field.value}
                </span>
              </div>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(vals: number[]) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='metadata.isStackable'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel>Stackable</FormLabel>
                <div className='text-sm text-muted-foreground'>
                  Can be combined with other promotions
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
