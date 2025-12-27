import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DiscountType, type Promotion, PromotionScope } from '@/types/growth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const promotionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().optional(),
  type: z.nativeEnum(DiscountType),
  value: z.number().min(0, 'Value must be positive'),
  scope: z.nativeEnum(PromotionScope),
  targetSku: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budgetLimitAmount: z.number().optional(),
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
      type: initialData?.type || DiscountType.PERCENTAGE,
      value: initialData?.value ?? 0,
      scope: initialData?.scope || PromotionScope.CART,
      targetSku: initialData?.targetSku || '',
      startDate: initialData?.startDate || '',
      endDate: initialData?.endDate || '',
      budgetLimitAmount: initialData?.budgetLimitAmount ?? undefined,
    },
  })

  const watchScope = form.watch('scope')

  function onSubmit(data: PromotionFormValues) {
    // eslint-disable-next-line no-console
    console.log('Submitted Promotion:', data)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex w-full flex-col gap-6 overflow-y-auto p-4 sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>
            {initialData ? 'Edit Promotion' : 'New Promotion'}
          </SheetTitle>
          <SheetDescription>
            Create or edit a marketing campaign.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
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

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={DiscountType.PERCENTAGE}>
                          Percentage
                        </SelectItem>
                        <SelectItem value={DiscountType.FIXED}>
                          Fixed Amount
                        </SelectItem>
                        <SelectItem value={DiscountType.FIXED_PRICE}>
                          Fixed Price
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='value'
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

            <FormField
              control={form.control}
              name='scope'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scope</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select scope' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PromotionScope.CART}>
                        Cart Total
                      </SelectItem>
                      <SelectItem value={PromotionScope.CATEGORY}>
                        Category
                      </SelectItem>
                      <SelectItem value={PromotionScope.PRODUCT}>
                        Specific Product
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchScope === PromotionScope.PRODUCT && (
              <FormField
                control={form.control}
                name='targetSku'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target SKU</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. latte_01' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
                  <FormDescription>
                    Maximum discount amount to burn.
                  </FormDescription>
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
