import { useFormContext } from 'react-hook-form'
import { DiscountType } from '@/types/growth'
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

export function ActionSection() {
  const form = useFormContext()
  const actionType = form.watch('metadata.action.actionType')

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>Then (Action)</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='metadata.action.actionType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select discount type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={DiscountType.PERCENTAGE}>
                      Percentage Off
                    </SelectItem>
                    <SelectItem value={DiscountType.FIXED}>
                      Fixed Amount Off
                    </SelectItem>
                    <SelectItem value={DiscountType.FIXED_PRICE}>
                      Set Fixed Price
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='metadata.action.value'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
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

        {actionType === DiscountType.FIXED_PRICE && (
          <FormField
            control={form.control}
            name='metadata.action.applyToId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Product ID (for Set Price)</FormLabel>
                <FormControl>
                  <Input placeholder='p1' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  )
}
