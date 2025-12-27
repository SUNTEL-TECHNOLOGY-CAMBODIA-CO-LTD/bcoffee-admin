import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type Collection } from '../data/collection-schema'
import { MOCK_PRODUCTS } from '../data/mock-products'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  bannerUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  isActive: z.boolean().default(true),
  productIds: z.array(z.string()).default([]),
})

type FormValues = z.infer<typeof formSchema>

interface CollectionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  collection: Collection | null
  onSave: (data: FormValues) => void
}

export function CollectionSheet({
  open,
  onOpenChange,
  collection,
  onSave,
}: CollectionSheetProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: '',
      slug: '',
      bannerUrl: '',
      isActive: true,
      productIds: [],
    },
  })

  useEffect(() => {
    if (collection) {
      form.reset({
        name: collection.name,
        slug: collection.slug,
        bannerUrl: collection.bannerUrl || '',
        isActive: collection.isActive,
        productIds: collection.productIds,
      })
    } else {
      form.reset({
        name: '',
        slug: '',
        bannerUrl: '',
        isActive: true,
        productIds: [],
      })
    }
  }, [collection, form, open])

  const handleSubmit = (data: FormValues) => {
    onSave(data)
    onOpenChange(false)
  }

  // Auto-generate slug from name if creating new
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('name', e.target.value)
    if (!collection) {
      const slug = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      form.setValue('slug', slug)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex w-[400px] flex-col gap-6 p-0 sm:w-[540px] sm:max-w-none'>
        <div className='p-6 pb-0'>
          <SheetHeader>
            <SheetTitle>
              {collection ? 'Edit Collection' : 'Create Collection'}
            </SheetTitle>
            <SheetDescription>
              Manage collection details and associated products.
            </SheetDescription>
          </SheetHeader>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex min-h-0 flex-1 flex-col'
          >
            <Tabs defaultValue='info' className='flex flex-1 flex-col'>
              <div className='px-6'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='info'>Basic Info</TabsTrigger>
                  <TabsTrigger value='products'>Products</TabsTrigger>
                </TabsList>
              </div>

              <div className='flex-1 overflow-y-auto px-6 py-4'>
                <TabsContent value='info' className='mt-0 space-y-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g., Summer Specials'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              handleNameChange(e)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='slug'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder='summer-specials' {...field} />
                        </FormControl>
                        <FormDescription>
                          URL-friendly identifier for the collection.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='bannerUrl'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banner URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='https://...'
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='isActive'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>Active</FormLabel>
                          <FormDescription>
                            Enable or disable this collection publicly.
                          </FormDescription>
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
                </TabsContent>

                <TabsContent value='products' className='mt-0 space-y-4'>
                  <div className='space-y-4'>
                    <div className='text-sm text-muted-foreground'>
                      Select products to include in this collection.
                    </div>
                    <ScrollArea className='h-[400px] border p-4'>
                      <FormField
                        control={form.control}
                        name='productIds'
                        render={() => (
                          <div className='space-y-4'>
                            {MOCK_PRODUCTS.map((product) => (
                              <FormField
                                key={product.id}
                                control={form.control}
                                name='productIds'
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={product.id}
                                      className='flex flex-row items-start space-y-0 space-x-3'
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            product.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  product.id,
                                                ])
                                              : field.onChange(
                                                  (field.value || []).filter(
                                                    (value) =>
                                                      value !== product.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className='cursor-pointer text-sm font-normal'>
                                        {/* @ts-expect-error - MOCK_PRODUCTS has loose typing */}
                                        {product.name.en}
                                        <div className='mt-0.5 text-xs text-muted-foreground'>
                                          {product.sku}
                                        </div>
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                        )}
                      />
                    </ScrollArea>
                  </div>
                </TabsContent>
              </div>

              <div className='border-t p-6'>
                <SheetFooter className='flex flex-row justify-end'>
                  <Button type='submit'>
                    {collection ? 'Save Changes' : 'Create Collection'}
                  </Button>
                </SheetFooter>
              </div>
            </Tabs>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
