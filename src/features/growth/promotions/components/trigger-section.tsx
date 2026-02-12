import { useFormContext } from 'react-hook-form'
import { PromotionRuleType, PromotionOperator } from '@/types/promotions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function TriggerSection() {
  const form = useFormContext()

  const ruleType = form.watch('metadata.trigger.ruleType')

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>When (Trigger)</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='metadata.trigger.ruleType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select trigger type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={PromotionRuleType.CART_SUBTOTAL}>
                      Cart Subtotal
                    </SelectItem>
                    <SelectItem value={PromotionRuleType.PRODUCT_QUANTITY}>
                      Product Quantity
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='metadata.trigger.operator'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operator</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select operator' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={PromotionOperator.GTE}>
                      Greater than or equal ({'>='})
                    </SelectItem>
                    <SelectItem value={PromotionOperator.LTE}>
                      Less than or equal ({'<='})
                    </SelectItem>
                    <SelectItem value={PromotionOperator.EQ}>
                      Equal to (==)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='metadata.trigger.value'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {ruleType === PromotionRuleType.CART_SUBTOTAL
                    ? 'Amount ($)'
                    : 'Quantity'}
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value)
                      field.onChange(isNaN(val) ? 0 : val)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {ruleType === PromotionRuleType.PRODUCT_QUANTITY && (
          <FormField
            control={form.control}
            name='metadata.trigger.targetIds'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product IDs (Comma separated for now)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='p1, p2, p3'
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(',').map((s) => s.trim())
                      )
                    }
                    value={field.value?.join(', ') || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='metadata.excludeDirty'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel>Exclude "Dirty" Items</FormLabel>
                <div className='text-sm text-muted-foreground'>
                  Do not apply if item is already discounted
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
