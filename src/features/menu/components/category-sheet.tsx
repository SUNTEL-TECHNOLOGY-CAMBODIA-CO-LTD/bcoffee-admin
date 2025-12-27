import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { MOCK_CATEGORIES } from '../data/mock-categories'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  parentId: z.string().optional(),
  sortOrder: z.coerce.number().default(0),
})

type CategoryFormValues = z.infer<typeof categorySchema>

interface CategorySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: CategoryFormValues | null
}

export function CategorySheet({
  open,
  onOpenChange,
  initialData,
}: CategorySheetProps) {
  const form = useForm<
    z.input<typeof categorySchema>,
    unknown,
    CategoryFormValues
  >({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      sortOrder: 0,
    },
  })

  function onSubmit(data: CategoryFormValues) {
    // eslint-disable-next-line no-console
    console.log('Submitted Category:', data)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='p-4 sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>
            {initialData ? 'Edit Category' : 'Create Category'}
          </SheetTitle>
          <SheetDescription>
            {initialData
              ? 'Update category details.'
              : 'Add a new category to organize your menu items.'}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 py-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. Hot Coffee'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        // Auto-generate slug if empty
                        if (!form.getValues('slug')) {
                          form.setValue(
                            'slug',
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)/g, '')
                          )
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. hot-coffee' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sortOrder'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        value={field.value as number | string}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value || 0))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='parentId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select parent (optional)' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='none'>None</SelectItem>
                      {MOCK_CATEGORIES.filter(
                        (c) => c.id !== initialData?.name // Very simple check to prevent self-parenting loop in UI only
                      ).map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end pt-4'>
              <Button type='submit'>
                {initialData ? 'Update Category' : 'Create Category'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
