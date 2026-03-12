import { useNavigate, useSearch } from '@tanstack/react-router'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useShopStore } from '@/stores/shop-store'
import { PageTitle } from '@/components/page-title'
import { ProgramType, ProgramStatus } from '@/types/loyalty'
import { createProgram } from '@/services/loyalty'
import { usePromotions } from '@/features/growth/promotions/hooks/use-promotions'

const programSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  type: z.nativeEnum(ProgramType),
  displayPromotionId: z.string().optional(),
  status: z.nativeEnum(ProgramStatus).default(ProgramStatus.ACTIVE),
  config: z.any(), // We'll refine this in the form UI
})

export default function ProgramCreateView() {
  const navigate = useNavigate()
  const { type } = useSearch({ from: '/_authenticated/loyalty/programs/create' })
  const { shopId } = useShopStore()

  const { data: promotionsData } = usePromotions({ limit: 100 })
  const promotions = promotionsData?.data || []

  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: '',
      description: '',
      type: type as ProgramType,
      displayPromotionId: '',
      status: ProgramStatus.ACTIVE,
      config: 
        type === ProgramType.STAMP_CARD 
          ? { maxStamps: 10, milestones: [{ stamps: 10, rewardPromotionId: '' }] }
          : type === ProgramType.NEW_USER
          ? { rewardPromotionId: '' }
          : { referrerRewardPromotionId: '', refereeRewardPromotionId: '' }
    },
  })

  // For Stamp Card Milestones
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "config.milestones",
  });

  const onSubmit = async (data: z.infer<typeof programSchema>) => {
    try {
      if (!shopId) {
        toast.error('No business selected')
        return
      }

      await createProgram({
        ...data,
        businessId: shopId,
      })
      toast.success('Program created successfully')
      navigate({ to: '/loyalty/programs' })
    } catch (_error) {
      toast.error('Failed to create program')
    }
  }

  return (
    <div className='flex flex-col gap-4 p-6 lg:gap-6 lg:p-6'>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' onClick={() => navigate({ to: '/loyalty/programs' })}>
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <PageTitle title={`Create ${type?.replace('_', ' ')} Program`} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>General details about this program.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Name</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. Welcome Drink 50% Off' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Short description for internal use' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                   control={form.control}
                   name='displayPromotionId'
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Billboard Promotion (Visual)</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger>
                             <SelectValue placeholder='Select a promotion for the UI' />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           {promotions.map((p) => (
                             <SelectItem key={p.id} value={p.id}>
                               {typeof p.name === 'string' ? p.name : p.name.en}
                             </SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                       <FormDescription>This promotion provides the artwork/banners in the mobile app.</FormDescription>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rule Configuration</CardTitle>
                <CardDescription>Specific rules for reward logic.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {type === ProgramType.NEW_USER && (
                  <FormField
                    control={form.control}
                    name='config.rewardPromotionId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Promotion</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select reward' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {promotions.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {typeof p.name === 'string' ? p.name : p.name.en}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {type === ProgramType.STAMP_CARD && (
                  <>
                    <FormField
                      control={form.control}
                      name='config.maxStamps'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Stamps</FormLabel>
                          <FormControl>
                            <Input type='number' {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Milestones</FormLabel>
                        <Button type='button' variant='outline' size='sm' onClick={() => append({ stamps: 0, rewardPromotionId: '' })}>
                          <Plus className='mr-2 h-4 w-4' /> Add Milestone
                        </Button>
                      </div>
                      {fields.map((field, index) => (
                        <div key={field.id} className='flex items-end gap-2 rounded-lg border p-4'>
                          <FormField
                            control={form.control}
                            name={`config.milestones.${index}.stamps`}
                            render={({ field }) => (
                              <FormItem className='flex-1'>
                                <FormLabel>Stamps</FormLabel>
                                <FormControl>
                                  <Input type='number' {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`config.milestones.${index}.rewardPromotionId`}
                            render={({ field }) => (
                              <FormItem className='flex-[2]'>
                                <FormLabel>Reward</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder='Select reward' />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {promotions.map((p) => (
                                      <SelectItem key={p.id} value={p.id}>
                                        {typeof p.name === 'string' ? p.name : p.name.en}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button variant='ghost' size='icon' onClick={() => remove(index)}>
                            <Trash2 className='h-4 w-4 text-destructive' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {type === ProgramType.REFERRAL && (
                  <>
                    <FormField
                      control={form.control}
                      name='config.referrerRewardPromotionId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referrer Reward</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select reward for inviter' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {promotions.map((p) => (
                                <SelectItem key={p.id} value={p.id}>
                                  {typeof p.name === 'string' ? p.name : p.name.en}
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select reward for new user' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {promotions.map((p) => (
                                <SelectItem key={p.id} value={p.id}>
                                  {typeof p.name === 'string' ? p.name : p.name.en}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' type='button' onClick={() => navigate({ to: '/loyalty/programs' })}>
              Cancel
            </Button>
            <Button type='submit'>
              <Save className='mr-2 h-4 w-4' /> Save Program
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

