import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InventoryAdjustmentReason } from '@/types/api'
import { type ShopIngredient } from '@/types/inventory'
import { toast } from 'sonner'
import { getTranslation } from '@/utils/i18n'
import { useAdjustStock } from '@/hooks/queries/use-inventory'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

interface StockAdjustmentSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: ShopIngredient | null
  shopId: string
}

const adjustmentSchema = z.object({
  type: z.enum(['add', 'remove']),
  quantity: z.coerce.number().min(0.0001, 'Quantity must be greater than 0'),
  reason: z.nativeEnum(InventoryAdjustmentReason),
  note: z.string().optional(),
})

type AdjustmentFormValues = z.infer<typeof adjustmentSchema>

export function StockAdjustmentSheet({
  open,
  onOpenChange,
  item,
  shopId,
}: StockAdjustmentSheetProps) {
  const adjustStock = useAdjustStock()

  const form = useForm<AdjustmentFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(adjustmentSchema) as any,
    defaultValues: {
      type: 'add',
      quantity: 0,
      reason: InventoryAdjustmentReason.RESTOCK,
      note: '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        type: 'add',
        quantity: 0,
        reason: InventoryAdjustmentReason.RESTOCK,
        note: '',
      })
    }
  }, [open, form])

  const onSubmit = (values: AdjustmentFormValues) => {
    if (!item) return

    const quantityChange =
      values.type === 'add' ? values.quantity : -values.quantity

    adjustStock.mutate(
      {
        shopId: shopId,
        data: {
          shopId: shopId,
          ingredientId: item.ingredientId,
          quantityChange,
          reason: values.reason,
          note: values.note,
        },
      },
      {
        onSuccess: () => {
          toast.success('Stock adjusted successfully')
          onOpenChange(false)
        },
        onError: (error) => {
          toast.error('Failed to adjust stock')
          // eslint-disable-next-line no-console
          console.error(error)
        },
      }
    )
  }

  const isPending = adjustStock.isPending

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='p-4'>
        <SheetHeader>
          <SheetTitle>Adjust Stock</SheetTitle>
          <SheetDescription>
            Update stock level for{' '}
            <span className='font-semibold'>
              {item ? getTranslation(item.name) : ''}
            </span>
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 space-y-6'
          >
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Adjustment Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-y-0 space-x-3'>
                        <FormControl>
                          <RadioGroupItem value='add' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Add Stock (Restock, Correction)
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-3'>
                        <FormControl>
                          <RadioGroupItem value='remove' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Remove Stock (Waste, Damage)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quantity ({item ? getTranslation(item.unit) : ''})
                  </FormLabel>
                  <FormControl>
                    <Input type='number' step='any' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='reason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a reason' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(InventoryAdjustmentReason).map(
                        (reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Add details about this adjustment...'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end pt-4'>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Adjustment'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
