import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Staff } from '@/types/staff'
import { Trash } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { sidebarData } from '@/components/layout/data/sidebar-data'
import { MOCK_ROLES } from '../data/mock-staff'

// Using sidebar data for shop list for now

const staffSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  phone: z.string().min(1, 'Phone is required'),
  pin: z.string().min(4, 'PIN must be at least 4 digits').optional(), // Optional for edit if not changing
  access: z.array(
    z.object({
      shopId: z.string().min(1, 'Shop is required'),
      roleId: z.string().min(1, 'Role is required'),
    })
  ),
})

type StaffFormValues = z.infer<typeof staffSchema>

interface StaffSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Staff | null
}

export function StaffSheet({
  open,
  onOpenChange,
  initialData,
}: StaffSheetProps) {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      fullName: initialData?.fullName || '',
      username: initialData?.username || '',
      phone: initialData?.phone || '',
      pin: '',
      access:
        initialData?.access.map((a) => ({
          shopId: a.shopId,
          roleId: a.roleId,
        })) || [],
    },
  })

  // Reset form when opening with new data
  if (
    open &&
    initialData &&
    form.getValues('username') !== initialData.username
  ) {
    form.reset({
      fullName: initialData.fullName,
      username: initialData.username,
      phone: initialData.phone,
      pin: '',
      access: initialData.access.map((a) => ({
        shopId: a.shopId,
        roleId: a.roleId,
      })),
    })
  }

  // Clear form if opened for "Create"
  if (open && !initialData && form.getValues('fullName')) {
    form.reset({
      fullName: '',
      username: '',
      phone: '',
      pin: '',
      access: [],
    })
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'access',
  })

  function onSubmit(data: StaffFormValues) {
    // eslint-disable-next-line no-console
    console.log('Submitted Staff:', data)
    onOpenChange(false)
    form.reset()
  }

  // Derive shops from sidebar data teams for mock purposes
  // In real app, this would come from a shops API context
  const shops = sidebarData.teams.map((t, index) => ({
    id: index === 0 ? 'shop_01' : 'shop_02', // Mocking IDs based on index
    name: t.name,
  }))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex w-full flex-col gap-6 overflow-y-auto p-4 sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>
            {initialData ? 'Edit Staff Member' : 'Add New Staff'}
          </SheetTitle>
          <SheetDescription>
            {initialData
              ? 'Update staff details and permissions.'
              : 'Create a new staff account and assign roles.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <Tabs defaultValue='profile' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='profile'>Profile</TabsTrigger>
                <TabsTrigger value='access'>Access & Roles</TabsTrigger>
              </TabsList>

              <TabsContent value='profile' className='space-y-4 py-4'>
                <FormField
                  control={form.control}
                  name='fullName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. John Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. johndoe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder='+1...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='pin'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PIN Code{' '}
                        {initialData && '(Leave empty to keep unchanged)'}
                      </FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='****' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value='access' className='space-y-4 py-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <h3 className='font-medium'>Shop Access</h3>
                    <p className='text-sm text-muted-foreground'>
                      Assign this staff member to specific locations with
                      defined roles.
                    </p>
                  </div>
                  <Button
                    type='button'
                    size='sm'
                    variant='outline'
                    onClick={() => append({ shopId: '', roleId: '' })}
                  >
                    Add Shop
                  </Button>
                </div>

                <div className='space-y-4'>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className='flex items-end gap-4 rounded-lg border p-3'
                    >
                      <FormField
                        control={form.control}
                        name={`access.${index}.shopId`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel className='text-xs'>Shop</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select shop' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {shops.map((shop) => (
                                  <SelectItem key={shop.id} value={shop.id}>
                                    {shop.name}
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
                        name={`access.${index}.roleId`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel className='text-xs'>Role</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select role' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {MOCK_ROLES.map((role) => (
                                  <SelectItem key={role.id} value={role.id}>
                                    {role.name.en}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='mb-0.5 text-destructive'
                        onClick={() => remove(index)}
                      >
                        <Trash className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                  {fields.length === 0 && (
                    <div className='rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground'>
                      No access assigned yet. Click "Add Shop" to start.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className='mt-auto flex justify-end pt-4'>
              <Button type='submit'>
                {initialData ? 'Save Changes' : 'Create Staff'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
