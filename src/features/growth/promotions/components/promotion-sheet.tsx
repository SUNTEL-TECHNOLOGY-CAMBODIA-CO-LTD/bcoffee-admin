import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DiscountType, type Promotion } from '@/types/growth'
import { PromotionRuleType, PromotionOperator } from '@/types/promotions'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { PromotionBuilder } from './promotion-builder'

const promotionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budgetLimitAmount: z.number().optional(),
  // New Metadata Structure
  metadata: z.object({
    trigger: z.object({
      ruleType: z.nativeEnum(PromotionRuleType),
      operator: z.nativeEnum(PromotionOperator),
      value: z.number().min(0),
      targetIds: z.array(z.string()).optional(),
    }),
    action: z.object({
      actionType: z.nativeEnum(DiscountType),
      value: z.number().min(0),
      applyToId: z.string().optional(),
    }),
    excludeDirty: z.boolean(),
    priority: z.number().min(0).max(100),
    isStackable: z.boolean(),
  }),
})

type PromotionFormValues = z.infer<typeof promotionSchema>

interface PromotionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Promotion | null
}

export function PromotionSheet({
  open,
  onOpenChange,
  initialData,
}: PromotionSheetProps) {
  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      name: initialData?.name.en || '',
      code: initialData?.code || '',
      startDate: initialData?.startDate || '',
      endDate: initialData?.endDate || '',
      budgetLimitAmount: initialData?.budgetLimitAmount ?? undefined,
      metadata: {
        trigger: {
          ruleType: PromotionRuleType.CART_SUBTOTAL,
          operator: PromotionOperator.GTE,
          value: 0,
          targetIds: [],
        },
        action: {
          actionType: DiscountType.PERCENTAGE,
          value: 0,
          applyToId: '',
        },
        excludeDirty: false,
        priority: 0,
        isStackable: false,
      },
    },
  })

  function onSubmit(data: PromotionFormValues) {
    // eslint-disable-next-line no-console
    console.log('Submitted Promotion:', data)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex w-full flex-col gap-6 overflow-y-auto p-4 sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>
            {initialData ? 'Edit Promotion' : 'New Promotion'}
          </SheetTitle>
          <SheetDescription>
            Create or edit a marketing campaign using the rule builder.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. Summer Sale' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. SUMMER2025' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <PromotionBuilder />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='budgetLimitAmount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Limit</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Optional'
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        field.onChange(isNaN(val) ? undefined : val)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mt-auto flex justify-end pt-4'>
              <Button type='submit'>Save Campaign</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
