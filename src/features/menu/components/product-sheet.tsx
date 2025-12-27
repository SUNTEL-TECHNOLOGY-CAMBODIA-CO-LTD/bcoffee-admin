import { type z } from 'zod'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { calculateRecipeCost, calculateMargin } from '@/utils/cost-engine'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { MOCK_CATEGORIES } from '../data/mock-categories'
import { MOCK_INGREDIENTS } from '../data/mock-ingredients'
import { MOCK_OPTION_GROUPS } from '../data/mock-options'
import { productSchema, ProductStatus, type Product } from '../data/schema'

interface ProductSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductSheet({ open, onOpenChange }: ProductSheetProps) {
  const form = useForm<z.input<typeof productSchema>, unknown, Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: { en: '' },
      description: { en: '' },
      sku: '',
      price: 0,
      categoryId: '',
      status: ProductStatus.DRAFT,
      imageUrl: '',
      optionGroups: [],
      recipes: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'recipes',
  })

  // Watch recipe fields and price for live cost calculation
  const recipeItems = useWatch({ control: form.control, name: 'recipes' })
  const price =
    (useWatch({ control: form.control, name: 'price' }) as number) || 0

  const ingredientsWithCost =
    recipeItems?.map((item) => {
      const ingredient = MOCK_INGREDIENTS.find(
        (i) => i.id === item.ingredientId
      )
      return {
        ingredientId: item.ingredientId,
        quantityUsed: Number(item.quantity || 0),
        costPerUnit: ingredient?.costPerUnit || 0,
      }
    }) || []

  const totalCost = calculateRecipeCost(ingredientsWithCost)
  const margin = calculateMargin(price || 0, totalCost)

  function onSubmit(data: Product) {
    // eslint-disable-next-line no-console
    console.log('Submitted Product:', data)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex w-full flex-col gap-6 overflow-y-auto p-4 sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>Create Product</SheetTitle>
          <SheetDescription>
            Add a new product to your menu. Configure pricing, category, and
            modifier options.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <Tabs defaultValue='general' className='w-full'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='general'>General</TabsTrigger>
                <TabsTrigger value='options'>Options</TabsTrigger>
                <TabsTrigger value='recipes'>Recipes</TabsTrigger>
              </TabsList>

              <TabsContent value='general' className='space-y-4 py-4'>
                <FormField
                  control={form.control}
                  name='name.en'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. Latte' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='sku'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder='SKU' {...field} />
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
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            step='0.01'
                            {...field}
                            value={field.value as number}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select category' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MOCK_CATEGORIES.map((category) => (
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
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select status' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(ProductStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='description.en'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Product description...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value='options' className='space-y-4 py-4'>
                <div className='grid gap-4'>
                  {MOCK_OPTION_GROUPS.map((group) => (
                    <FormField
                      key={group.id}
                      control={form.control}
                      name='optionGroups'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={group.id}
                            className='flex flex-row items-start space-y-0 space-x-3 text-left'
                          >
                            <FormControl className='mt-1'>
                              <Checkbox
                                checked={field.value?.includes(
                                  group.id as string
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        group.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== group.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                              <FormLabel className='text-base font-medium'>
                                {group.name}
                              </FormLabel>
                              <div className='flex gap-2 text-sm text-muted-foreground'>
                                <Badge variant='outline'>{group.type}</Badge>
                                <span>{group.options.length} choices</span>
                              </div>
                            </div>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  {MOCK_OPTION_GROUPS.length === 0 && (
                    <p className='text-sm text-muted-foreground'>
                      No option groups available. Create one in Option Groups.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value='recipes' className='space-y-4 py-4'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Cost Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <div className='text-2xl font-bold'>
                          ${totalCost.toFixed(2)}
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          Total Ingredient Cost
                        </p>
                      </div>
                      <div>
                        <div
                          className={`text-2xl font-bold ${
                            margin < 60
                              ? 'text-red-500'
                              : margin > 70
                                ? 'text-green-500'
                                : ''
                          }`}
                        >
                          {margin}%
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          Gross Margin
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <h3 className='text-lg font-medium'>Product Recipe</h3>
                    <p className='text-sm text-muted-foreground'>
                      Define the standard consumption for this product.
                      Modifiers (e.g., &apos;Extra Shot&apos;) are configured
                      separately in Option Groups.
                    </p>
                  </div>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => append({ ingredientId: '', quantity: 0 })}
                  >
                    Add Ingredient
                  </Button>
                </div>
                <div className='space-y-4'>
                  {fields.map((field, index) => (
                    <div key={field.id} className='flex items-end gap-4'>
                      <FormField
                        control={form.control}
                        name={`recipes.${index}.ingredientId`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                              Ingredient
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select ingredient' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {MOCK_INGREDIENTS.map((ingredient) => (
                                  <SelectItem
                                    key={ingredient.id}
                                    value={ingredient.id}
                                  >
                                    {ingredient.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`recipes.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className='w-32'>
                            <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                              Quantity
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                {...field}
                                value={field.value as number | string}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className='w-16 pb-2.5 text-sm text-muted-foreground'>
                        {MOCK_INGREDIENTS.find(
                          (i) =>
                            i.id === form.watch(`recipes.${index}.ingredientId`)
                        )?.unit || '-'}
                      </div>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => remove(index)}
                        className='mb-0.5'
                      >
                        <span className='sr-only'>Remove</span>
                        &times;
                      </Button>
                    </div>
                  ))}
                  {fields.length === 0 && (
                    <div className='flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground'>
                      No ingredients added yet.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className='mt-auto flex justify-end pt-4'>
              <Button type='submit'>Save Product</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
