import { useEffect } from 'react'
import { type z } from 'zod'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type OptionGroup,
  type OptionChoice,
  type CreateProductRequest,
} from '@/types/api'
import _ from 'lodash'
import { ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { calculateRecipeCost, calculateMargin } from '@/utils/cost-engine'
import { formatCurrency } from '@/utils/format'
import {
  useCategories,
  useCreateProduct,
  useUpdateProduct,
  useOptionGroups,
} from '@/hooks/queries/use-catalog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
import { MultiLangImageUpload } from '@/components/custom/multi-lang-image-upload'
import { MultiLangInput } from '@/components/custom/multi-lang-input'
import { MultiLangTextarea } from '@/components/custom/multi-lang-textarea'
import { MOCK_INGREDIENTS } from '../data/mock-ingredients'
import {
  type Category,
  productSchema,
  ProductStatus,
  type Product,
  OptionType,
} from '../data/schema'

function OptionGroupDetails({ group }: { group: OptionGroup }) {
  if (!group?.choices?.length) {
    return (
      <div className='py-2 text-sm text-muted-foreground'>
        No choices found.
      </div>
    )
  }

  return (
    <div className='grid gap-2 py-2'>
      <div className='mb-1 grid grid-cols-2 text-xs font-medium text-muted-foreground'>
        <span>Choice Name</span>
        <span className='text-right'>Price</span>
      </div>
      {group.choices.map((option: OptionChoice) => (
        <div key={option.id || option.sku} className='grid grid-cols-2 text-sm'>
          <span>{option.name['en'] || 'Untitled'}</span>
          <span className='text-right font-mono'>
            {option.price > 0 ? `${formatCurrency(option.price)}` : '-'}
          </span>
        </div>
      ))}
    </div>
  )
}

interface ProductSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null // Adding product prop for edit mode
}

export function ProductSheet({
  open,
  onOpenChange,
  product,
}: ProductSheetProps) {
  const { data: categories } = useCategories()
  const { data: optionGroups } = useOptionGroups()
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct()
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct()

  // Removed unused isPending variable if it's not used in UI or use it if needed.
  const isPending = isCreating || isUpdating

  const form = useForm<z.input<typeof productSchema>, unknown, Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: { en: '' },
      description: { en: '' },
      sku: '',
      price: {
        name: { en: 'Size' },
        type: OptionType.VARIANT,
        sku: '',
        minSelect: 1,
        maxSelect: 1,
        choices: [
          {
            sku: '',
            name: { en: 'Standard' },
            price: 0,
          },
        ],
      },
      priceGroupId: '',
      categoryId: '',
      status: ProductStatus.DRAFT,
      imageUrl: {},
      optionGroupIds: [],
      recipes: [],
    },
  })

  // Reset form when product changes or sheet opens
  useEffect(() => {
    if (open) {
      form.reset(
        product || {
          name: { en: '' },
          description: { en: '' },
          sku: '',
          price: {
            name: { en: 'Size' },
            type: OptionType.VARIANT,
            sku: '',
            minSelect: 1,
            maxSelect: 1,
            choices: [
              {
                sku: '',
                name: { en: 'Standard' },
                price: 0,
              },
            ],
          },
          priceGroupId: '',
          categoryId: '',
          status: ProductStatus.DRAFT,
          imageUrl: {},
          optionGroupIds: [],
          recipes: [],
        }
      )
    }
  }, [open, product, form])

  // Watch SKU to auto-generate price SKU
  const productSku = useWatch({ control: form.control, name: 'sku' })
  useEffect(() => {
    const currentPriceSku = form.getValues('price.sku')
    if (
      productSku &&
      (!currentPriceSku ||
        currentPriceSku === `${productSku}-VAR` ||
        currentPriceSku.endsWith('-VAR'))
    ) {
      form.setValue('price.sku', `${productSku}-VAR`)
    }
  }, [productSku, form])

  // ... (recipes array and cost calculations remain same) ...

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'recipes',
  })

  // Watch recipe fields and price for live cost calculation
  const recipeItems = useWatch({ control: form.control, name: 'recipes' })
  // For cost calc, if single price, use that. If variant, maybe use lowest?
  // Let's just use the first choice's price for now as a rough estimate or 0.
  const priceData = useWatch({ control: form.control, name: 'price' })
  const estimatedPrice = Number(priceData?.choices?.[0]?.price) || 0

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
  const margin = calculateMargin(estimatedPrice, totalCost)

  function onSubmit(data: z.infer<typeof productSchema>) {
    if (product?.id) {
      updateProduct(
        { id: product.id, data },
        {
          onSuccess: () => {
            toast.success('Product updated successfully')
            onOpenChange(false)
            form.reset()
          },
          onError: () => {
            toast.error('Failed to update product')
          },
        }
      )
    } else {
      createProduct(data as unknown as CreateProductRequest, {
        onSuccess: () => {
          toast.success('Product created successfully')
          onOpenChange(false)
          form.reset()
        },
        onError: () => {
          toast.error('Failed to create product')
        },
      })
    }
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
                  name='imageUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <FormControl>
                        <MultiLangImageUpload
                          value={field.value || {}}
                          onChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      {/* Label is handled inside MultiLangInput */}
                      <FormControl>
                        <MultiLangInput
                          label='Product Name'
                          placeholder='e.g. Latte'
                          value={field.value as Record<string, string>}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='sku'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='SKU'
                          {...field}
                          disabled={!_.isEmpty(product)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pricing Strategy Section */}
                <FormLabel>Pricing Strategy</FormLabel>
                <div className='rounded-lg border p-2'>
                  <FormField
                    control={form.control}
                    name='price.name'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiLangInput
                            label='Label (e.g. Size)'
                            placeholder='Size'
                            value={field.value as Record<string, string>}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='space-y-2'>
                    <div className='mb-2 grid grid-cols-12 gap-2 px-2 pt-2'>
                      <div className='col-span-5 text-sm font-medium'>
                        Variant Name
                      </div>
                      <div className='col-span-3 text-sm font-medium'>
                        Price
                      </div>
                      <div className='col-span-3 text-sm font-medium'>SKU</div>
                      <div className='col-span-1'></div>
                    </div>

                    {/* Variants List */}
                    {(form.watch('price.choices') || []).map((_, index) => (
                      <div
                        key={index}
                        className='grid grid-cols-12 items-end gap-2 p-2'
                      >
                        <div className='col-span-5'>
                          <FormField
                            control={form.control}
                            name={`price.choices.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <MultiLangInput
                                  placeholder='Standard'
                                  value={field.value as Record<string, string>}
                                  onChange={field.onChange}
                                />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='col-span-3'>
                          <FormField
                            control={form.control}
                            name={`price.choices.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <Input
                                  type='number'
                                  step='0.01'
                                  {...field}
                                  value={
                                    typeof field.value === 'number'
                                      ? field.value
                                      : 0
                                  }
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='col-span-3'>
                          <FormField
                            control={form.control}
                            name={`price.choices.${index}.sku`}
                            render={({ field }) => (
                              <FormItem>
                                <Input {...field} placeholder='SKU' />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='col-span-1 pt-1'>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => {
                              const choices =
                                form.getValues('price.choices') || []
                              form.setValue(
                                'price.choices',
                                choices.filter((__, i) => i !== index)
                              )
                            }}
                          >
                            &times;
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      type='button'
                      size='sm'
                      variant='outline'
                      className='mt-2 self-end'
                      onClick={() => {
                        const choices = form.getValues('price.choices') || []
                        const parentSku = form.getValues('sku')
                        const newSku = parentSku
                          ? `${parentSku}-${choices.length + 1}`
                          : ''

                        form.setValue('price.choices', [
                          ...choices,
                          {
                            sku: newSku,
                            name: { en: '' },
                            price: 0,
                          },
                        ])
                      }}
                    >
                      Add Variant
                    </Button>
                  </div>
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
                            {categories?.map((category: Category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name['en']}
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
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiLangTextarea
                          label='Description (Optional)'
                          placeholder='Product description...'
                          value={(field.value || {}) as Record<string, string>}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value='options' className='space-y-4 py-4'>
                <FormField
                  control={form.control}
                  name='optionGroupIds'
                  render={({ field }) => (
                    <FormItem>
                      <div className='grid gap-4'>
                        {optionGroups?.map((group: OptionGroup) => (
                          <Collapsible key={group.id}>
                            <FormItem className='space-y-0'>
                              <div className='flex cursor-pointer items-start space-x-3 rounded-md border p-3 transition-colors hover:bg-muted/50'>
                                <FormControl
                                  className='mt-1'
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Checkbox
                                    checked={field.value?.includes(group.id)}
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
                                <div className='flex-1 space-y-2 leading-none'>
                                  <div className='flex items-center'>
                                    <FormLabel className='cursor-pointer text-base font-medium'>
                                      {group.name['en'] || 'Untitled'}
                                    </FormLabel>
                                  </div>
                                  <CollapsibleTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      size='sm'
                                      className='group flex items-center gap-2 p-0 text-sm text-muted-foreground hover:bg-transparent'
                                      type='button'
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <ChevronRight className='h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90' />
                                      <span className='sr-only'>
                                        Toggle choices
                                      </span>
                                      <Badge variant='outline'>
                                        {group.type}
                                      </Badge>
                                      <span>
                                        {group._count?.choices || 0} choices
                                      </span>
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <div
                                      className='mt-2 pl-0'
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <OptionGroupDetails group={group} />
                                    </div>
                                  </CollapsibleContent>
                                </div>
                              </div>
                            </FormItem>
                          </Collapsible>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
