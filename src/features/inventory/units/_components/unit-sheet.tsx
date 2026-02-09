import { useEffect } from 'react'
import { z } from 'zod'
import { type Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type UnitOfMeasure } from '@/types/inventory'
import { toast } from 'sonner'
import { useCreateUnit, useUpdateUnit } from '@/hooks/queries/use-inventory'
import { useZodSchema } from '@/hooks/use-zod-schema'
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
import { MultiLangInput } from '@/components/custom/multi-lang-input'

interface UnitSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: UnitOfMeasure | null
}

// Minimal schema for creating a unit
const getUnitSchema = (t: (key: string) => string) =>
  z.object({
    name: z.record(z.string(), z.string()).refine((val) => val.en?.length > 0, {
      message: t('validation.required'),
    }),
    symbol: z
      .record(z.string(), z.string())
      .refine((val) => val.en?.length > 0, {
        message: t('validation.required'),
      }),
    baseMultiplier: z.coerce.number().min(0).default(1),
    type: z.enum(['MASS', 'VOLUME', 'COUNT']),
  })

export function UnitSheet({ open, onOpenChange, initialData }: UnitSheetProps) {
  const formSchema = useZodSchema(getUnitSchema)
  const createUnit = useCreateUnit()
  const updateUnit = useUpdateUnit()

  type UnitFormValues = {
    name: Record<string, string>
    symbol: Record<string, string>
    type: 'MASS' | 'VOLUME' | 'COUNT'
    baseMultiplier: number
  }

  const form = useForm<UnitFormValues>({
    resolver: zodResolver(formSchema) as Resolver<UnitFormValues>,
    defaultValues: {
      name: { en: '' },
      symbol: { en: '' },
      type: 'MASS',
      baseMultiplier: 1,
    },
  })

  // Reset form when initialData changes or sheet opens
  useEffect(() => {
    if (open) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          symbol: initialData.symbol,
          type: initialData.type as 'MASS' | 'VOLUME' | 'COUNT',
          baseMultiplier: initialData.baseMultiplier,
        })
      } else {
        form.reset({
          name: { en: '' },
          symbol: { en: '' },
          type: 'MASS',
          baseMultiplier: 1,
        })
      }
    }
  }, [open, initialData, form])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      updateUnit.mutate(
        { id: initialData.id, data: values },
        {
          onSuccess: () => {
            toast.success('Unit updated successfully')
            form.reset()
            onOpenChange(false)
          },
          onError: (error) => {
            toast.error('Failed to update unit')
            console.error(error)
          },
        }
      )
    } else {
      createUnit.mutate(values, {
        onSuccess: () => {
          toast.success('Unit created successfully')
          form.reset()
          onOpenChange(false)
        },
        onError: (error) => {
          toast.error('Failed to create unit')
          console.error(error)
        },
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col gap-6 overflow-y-auto p-4'>
        <SheetHeader>
          <SheetTitle>
            {initialData ? 'Edit Unit of Measure' : 'Create Unit of Measure'}
          </SheetTitle>
          <SheetDescription>
            {initialData
              ? 'Update unit details.'
              : 'Add a new unit for your ingredients (e.g., Kilogram, Liter).'}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <MultiLangInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{ en: 'e.g. Kilogram' }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='symbol'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <MultiLangInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{ en: 'e.g. kg' }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select unit type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='MASS'>Mass (e.g. kg, g)</SelectItem>
                      <SelectItem value='VOLUME'>
                        Volume (e.g. L, ml)
                      </SelectItem>
                      <SelectItem value='COUNT'>
                        Count (e.g. pcs, unit)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='baseMultiplier'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Multiplier</FormLabel>
                  <FormControl>
                    <Input type='number' step='0.001' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end pt-4'>
              <Button
                type='submit'
                disabled={createUnit.isPending || updateUnit.isPending}
              >
                {createUnit.isPending || updateUnit.isPending
                  ? 'Saving...'
                  : initialData
                    ? 'Save Changes'
                    : 'Create Unit'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
