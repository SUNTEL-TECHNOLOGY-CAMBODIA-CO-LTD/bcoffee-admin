import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from 'lucide-react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const formSchema = z.object({
  ingredientId: z.string().min(1, {
    message: 'Please select an ingredient.',
  }),
  currentStock: z.coerce.number().min(0, {
    message: 'Stock must be a positive number.',
  }),
  unit: z.enum(['g', 'ml', 'pcs'] as const, {
    message: 'Please select a unit.',
  }),
  lowStockThreshold: z.coerce.number().min(0, {
    message: 'Low stock threshold must be a positive number.',
  }),
  price: z.coerce.number().min(0, {
    message: 'Price must be a positive number.',
  }),
})

export type InventoryFormValues = z.infer<typeof formSchema>

interface InventoryFormProps {
  onSubmit: (data: InventoryFormValues) => void
}

export function InventoryForm({ onSubmit }: InventoryFormProps) {
  const form = useForm<
    z.input<typeof formSchema>,
    unknown,
    InventoryFormValues
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredientId: '',
      currentStock: 0,
      unit: 'g',
      lowStockThreshold: 0,
      price: 0,
    },
  })

  function handleSubmit(data: InventoryFormValues) {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='ingredientId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredient ID / Name</FormLabel>
              <FormControl>
                <Input placeholder='Search or enter Ingredient ID' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='currentStock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Stock</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    value={field.value as number}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='unit'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2'>
                  Unit
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className='h-4 w-4 cursor-pointer text-muted-foreground' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fetched from Ingredient (Simulated)</p>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Unit' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='g'>Grams (g)</SelectItem>
                    <SelectItem value='ml'>Milliliters (ml)</SelectItem>
                    <SelectItem value='pcs'>Pieces (pcs)</SelectItem>
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
            name='lowStockThreshold'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Low Stock Threshold</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    value={field.value as number}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Override</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    value={field.value as number}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end pt-4'>
          <Button type='submit'>Update Stock / Add Item</Button>
        </div>
      </form>
    </Form>
  )
}
