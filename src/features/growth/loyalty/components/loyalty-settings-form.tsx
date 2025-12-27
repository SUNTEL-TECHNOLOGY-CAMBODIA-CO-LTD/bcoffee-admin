import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'
import {
  type LoyaltySettings,
  loyaltySettingsSchema,
} from '../../data/loyalty-schema'

interface LoyaltySettingsFormProps {
  initialData: LoyaltySettings
  onSave: (data: LoyaltySettings) => void
}

export function LoyaltySettingsForm({
  initialData,
  onSave,
}: LoyaltySettingsFormProps) {
  const form = useForm<LoyaltySettings>({
    resolver: zodResolver(loyaltySettingsSchema),
    defaultValues: initialData,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Rules</CardTitle>
        <CardDescription>
          Configure how customers earn and redeem points, and referral rewards.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id='loyalty-form'
            onSubmit={form.handleSubmit(onSave)}
            className='space-y-6'
          >
            <div className='grid gap-6 sm:grid-cols-2'>
              <div className='space-y-4'>
                <h3 className='text-sm font-medium'>Earning & Redemption</h3>
                <Separator />

                <FormField
                  control={form.control}
                  name='earningRate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Earning Rate</FormLabel>
                      <FormControl>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-muted-foreground'>
                            Earn
                          </span>
                          <Input
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            className='w-20 text-center'
                          />
                          <span className='text-sm text-muted-foreground'>
                            Points per $1 spent
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='redemptionRate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Redemption Rate</FormLabel>
                      <FormControl>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-muted-foreground'>
                            Redeem
                          </span>
                          <Input
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            className='w-20 text-center'
                          />
                          <span className='text-sm text-muted-foreground'>
                            Points for $1 discount
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4'>
                <h3 className='text-sm font-medium'>Referral Bonuses</h3>
                <Separator />

                <FormField
                  control={form.control}
                  name='referralBonusReferrer'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referrer Reward</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <span className='absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground'>
                            $
                          </span>
                          <Input
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            className='pl-6'
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Credit given to the person referring.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='referralBonusReferee'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referee Reward</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <span className='absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground'>
                            $
                          </span>
                          <Input
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            className='pl-6'
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Credit given to the new customer.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-end border-t px-6 py-4'>
        <Button type='submit' form='loyalty-form'>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
