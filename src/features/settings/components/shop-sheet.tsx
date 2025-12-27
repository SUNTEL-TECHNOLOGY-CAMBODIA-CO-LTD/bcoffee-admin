import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShoppingBag } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
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

const shopSchema = z.object({
  name: z.string().min(2, 'Shop name must be at least 2 characters'),
  code: z.string().min(2, 'Code must be at least 2 characters'),
  defaultCurrency: z.string().min(1, 'Currency is required'),
})

type ShopFormValues = z.infer<typeof shopSchema>

interface ShopSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShopSheet({ open, onOpenChange }: ShopSheetProps) {
  const { addShop } = useShopStore()

  const form = useForm<ShopFormValues>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: '',
      code: '',
      defaultCurrency: 'USD',
    },
  })

  function onSubmit(data: ShopFormValues) {
    addShop({
      id: data.name, // Using name as ID for simplicity as per plan
      name: data.name,
      code: data.code,
      plan: 'Free', // Default plan
      logo: ShoppingBag, // Default logo
      description: `New shop created with currency ${data.defaultCurrency}`,
    })
    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex w-full flex-col gap-6 overflow-y-auto p-4 sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Add New Shop</SheetTitle>
          <SheetDescription>
            Create a new shop to manage products and orders.
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
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder='My Coffee Shop' {...field} />
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
                  <FormLabel>Shop Code</FormLabel>
                  <FormControl>
                    <Input placeholder='MCS-01' {...field} />
                  </FormControl>
                  <FormDescription>
                    Unique identifier for invoice numbering.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='defaultCurrency'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select currency' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='USD'>USD ($)</SelectItem>
                      <SelectItem value='EUR'>EUR (€)</SelectItem>
                      <SelectItem value='GBP'>GBP (£)</SelectItem>
                      <SelectItem value='KHR'>KHR (៛)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mt-auto flex justify-end pt-4'>
              <Button type='submit'>Create Shop</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
