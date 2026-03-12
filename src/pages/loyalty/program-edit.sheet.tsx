import { useEffect } from 'react'
import * as z from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type Program,
  ProgramType,
  ProgramStatus,
  type ProgramConfig,
} from '@/types/loyalty'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
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
import { Switch } from '@/components/ui/switch'
import { usePromotions } from '@/features/growth/promotions/hooks/use-promotions'
import { useUpdateProgram } from '@/features/loyalty/hooks/use-programs'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  status: z.nativeEnum(ProgramStatus),
  config: z.object({
    rewardPromotionId: z.string().optional(),
    maxStamps: z.number().optional(),
    maxEarnedStampsPerOrder: z.number().min(1, 'Minimum 1 stamp').optional(),
    milestones: z
      .array(
        z.object({
          stamps: z.number().min(1, 'At least 1 stamp required'),
          rewardPromotionId: z.string().min(1, 'Reward is required'),
        })
      )
      .optional(),
    referrerRewardPromotionId: z.string().optional(),
    refereeRewardPromotionId: z.string().optional(),
  }),
})

type FormValues = z.infer<typeof formSchema>

interface Props {
  isOpen: boolean
  onClose: () => void
  program: Program | null
  onSuccess?: () => void
}

export function ProgramEditSheet({
  isOpen,
  onClose,
  program,
  onSuccess,
}: Props) {
  const { mutate: updateProgram, isPending } = useUpdateProgram()
  const { data: promotionsData } = usePromotions({ limit: 100 })
  const promotions = promotionsData?.data || []

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      status: ProgramStatus.ACTIVE,
      config: {},
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'config.milestones',
  })

  useEffect(() => {
    if (program) {
      form.reset({
        name: program.name,
        status: program.status,
        config: (program.config as any) || { milestones: [] },
      })
    }
  }, [program, form])

  const onSubmit = (values: FormValues) => {
    if (!program) return

    // Structure the config based on program type
    let finalConfig: ProgramConfig | undefined
    if (program.type === ProgramType.NEW_USER) {
      finalConfig = {
        rewardPromotionId: values.config.rewardPromotionId || '',
      }
    } else if (program.type === ProgramType.STAMP_CARD) {
      // Sort milestones by stamp count ascending
      const sortedMilestones = [...(values.config.milestones || [])].sort(
        (a, b) => a.stamps - b.stamps
      )

      finalConfig = {
        maxStamps: values.config.maxStamps || 0,
        milestones: sortedMilestones,
        maxEarnedStampsPerOrder: values.config.maxEarnedStampsPerOrder || 20,
      }
    } else if (program.type === ProgramType.REFERRAL) {
      finalConfig = {
        referrerRewardPromotionId:
          values.config.referrerRewardPromotionId || '',
        refereeRewardPromotionId: values.config.refereeRewardPromotionId || '',
      }
    }

    updateProgram(
      {
        id: program.id,
        data: {
          name: values.name,
          status: values.status,
          config: finalConfig as ProgramConfig,
          type: program.type,
        },
      },
      {
        onSuccess: () => {
          toast.success('Program updated successfully')
          onClose()
          if (onSuccess) onSuccess()
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Failed to update program'
          )
        },
      }
    )
  }

  const renderConfigFields = () => {
    if (!program) return null

    switch (program.type) {
      case ProgramType.NEW_USER:
        return (
          <FormField
            control={form.control}
            name='config.rewardPromotionId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reward Promotion</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select reward' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {promotions.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {typeof p.name === 'string'
                          ? p.name
                          : p.name?.en || 'Untitled'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case ProgramType.STAMP_CARD:
        return (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='config.maxStamps'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Stamps (Full Card)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ''
                              ? ''
                              : parseInt(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='config.maxEarnedStampsPerOrder'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Stamps Per Order</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Default: 20'
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ''
                              ? ''
                              : parseInt(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    {/* <p className='text-[0.8rem] text-muted-foreground'>
                      Limits stamps earned in a single transaction (Default: 20).
                    </p> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <FormLabel className='text-sm font-semibold'>
                  Milestones & Rewards
                </FormLabel>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => append({ stamps: 1, rewardPromotionId: '' })}
                >
                  <Plus className='mr-2 h-3 w-3' /> Add Milestone
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className='relative flex flex-col gap-4 rounded-md border bg-muted/20 p-4 pt-8 md:flex-row md:items-end md:pt-4'
                >
                  <div className='grid flex-1 grid-cols-1 gap-4 sm:grid-cols-12'>
                    <div className='sm:col-span-3'>
                      <FormField
                        control={form.control}
                        name={`config.milestones.${index}.stamps`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xs'>
                              Stamp Level
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                className='h-9'
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ''
                                      ? ''
                                      : parseInt(e.target.value)
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className='sm:col-span-9'>
                      <FormField
                        control={form.control}
                        name={`config.milestones.${index}.rewardPromotionId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xs'>Reward</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className='h-9'>
                                  <SelectValue placeholder='Select reward' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {promotions.map((p) => (
                                  <SelectItem key={p.id} value={p.id}>
                                    {typeof p.name === 'string'
                                      ? p.name
                                      : p.name?.en || 'Untitled'}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute top-2 right-2 h-8 w-8 text-destructive hover:bg-destructive/10 md:static md:mb-1'
                    onClick={() => remove(index)}
                  >
                    <Trash2 className='h-4 w-4' />
                    <span className='sr-only'>Remove milestone</span>
                  </Button>
                </div>
              ))}

              {fields.length === 0 && (
                <div className='rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground'>
                  No milestones added. Click "Add Milestone" to define rewards.
                </div>
              )}
            </div>
          </div>
        )
      case ProgramType.REFERRAL:
        return (
          <>
            <FormField
              control={form.control}
              name='config.referrerRewardPromotionId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referrer Reward</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select reward for inviter' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {promotions.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {typeof p.name === 'string'
                            ? p.name
                            : p.name?.en || 'Untitled'}
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
              name='config.refereeRewardPromotionId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referee Reward</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select reward for new user' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {promotions.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {typeof p.name === 'string'
                            ? p.name
                            : p.name?.en || 'Untitled'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )
      default:
        return null
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className='p-4 sm:max-w-[540px]'>
        <SheetHeader>
          <SheetTitle>Edit Program</SheetTitle>
          <SheetDescription>
            Modify the loyalty program settings.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 pt-6'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel>Active Status</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === ProgramStatus.ACTIVE}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked ? ProgramStatus.ACTIVE : ProgramStatus.PAUSED
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='space-y-4 rounded-lg border p-4'>
              <h3 className='text-sm font-medium'>Rule Configuration</h3>
              {renderConfigFields()}
            </div>

            <div className='flex justify-end gap-2 pt-4'>
              <Button variant='outline' type='button' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
