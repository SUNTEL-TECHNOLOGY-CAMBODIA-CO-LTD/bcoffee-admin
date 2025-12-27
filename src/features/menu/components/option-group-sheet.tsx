import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Link } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
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
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  optionGroupSchema,
  OptionType,
  type ProductOptionGroup,
} from '../data/schema'

interface OptionGroupSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OptionGroupSheet({
  open,
  onOpenChange,
}: OptionGroupSheetProps) {
  const form = useForm({
    resolver: zodResolver(optionGroupSchema),
    defaultValues: {
      name: { en: '' },
      type: OptionType.VARIANT,
      sku: '',
      minSelect: 0,
      maxSelect: 1,
      options: [
        {
          name: { en: '' },
          sku: '',
          price: 0,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  })

  function onSubmit(data: ProductOptionGroup) {
    // eslint-disable-next-line no-console
    console.log('Submitted Option Group:', data)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex w-full flex-col gap-6 overflow-y-auto p-4 sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>Create Option Group</SheetTitle>
          <SheetDescription>
            Define a set of options (variants, modifiers, or add-ons) for your
            products.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='name.en'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name (Internal/English)</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. Milk Options' {...field} />
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
                          {Object.values(OptionType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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
                  name='sku'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder='GRP-MILK-001' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='minSelect'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Selection</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          value={field.value as number}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>0 for optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='maxSelect'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Selection</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          value={field.value as number}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Limit choices (e.g. 1 for single pick)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-medium'>Choices</h3>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    append({
                      name: { en: '' },
                      sku: '',
                      price: 0,
                    })
                  }
                >
                  <Plus className='mr-2 h-3.5 w-3.5' /> Add Choice
                </Button>
              </div>

              <div className='space-y-4'>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className='grid gap-4 rounded-lg border p-4'
                  >
                    <div className='grid grid-cols-[1fr_1fr_100px_auto] items-start gap-2'>
                      <FormField
                        control={form.control}
                        name={`options.${index}.name.en`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xs'>Name</FormLabel>
                            <FormControl>
                              <Input placeholder='Choice Name' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.sku`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xs'>SKU</FormLabel>
                            <FormControl>
                              <Input placeholder='SKU' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xs'>
                              Add-on Price
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='Price'
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
                      <div className='pt-8'>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          <Trash2 className='h-4 w-4 text-muted-foreground hover:text-destructive' />
                        </Button>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 rounded-md bg-muted/50 p-2'>
                      <Link className='h-3 w-3 text-muted-foreground' />
                      <span className='text-xs text-muted-foreground'>
                        Link to Ingredient...
                      </span>
                      <Badge variant='outline' className='ml-auto text-[10px]'>
                        Recipe
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='mt-auto flex justify-end pt-4'>
              <Button type='submit'>Save Group</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
