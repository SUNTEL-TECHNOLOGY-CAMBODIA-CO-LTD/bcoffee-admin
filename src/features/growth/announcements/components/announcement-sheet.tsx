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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { type Announcement } from '../../data/announcement-schema'

// Explicit form schema to ensure strict typing for RHF
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  targetAudience: z.enum(['CUSTOMER', 'STAFF', 'ALL']),
  priority: z.enum(['HIGH', 'NORMAL']),
  imageUrl: z.string().optional(),
  sendPushNotification: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

type AnnouncementFormValues = z.infer<typeof formSchema>

interface AnnouncementSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  announcement?: Announcement | null
  onSave: (data: AnnouncementFormValues) => void
}

export function AnnouncementSheet({
  open,
  onOpenChange,
  announcement,
  onSave,
}: AnnouncementSheetProps) {
  const form = useForm<AnnouncementFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: '',
      content: '',
      targetAudience: 'CUSTOMER',
      priority: 'NORMAL',
      imageUrl: '',
      sendPushNotification: false,
      isActive: true,
    },
  })

  useEffect(() => {
    if (announcement) {
      form.reset({
        title: announcement.title,
        content: announcement.content,
        targetAudience: announcement.targetAudience,
        priority: announcement.priority,
        imageUrl: announcement.imageUrl || '',
        sendPushNotification: false,
        isActive: announcement.isActive,
      })
    } else {
      form.reset({
        title: '',
        content: '',
        targetAudience: 'CUSTOMER',
        priority: 'NORMAL',
        imageUrl: '',
        sendPushNotification: false,
        isActive: true,
      })
    }
  }, [announcement, form, open])

  const handleSubmit = (data: AnnouncementFormValues) => {
    onSave(data)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col gap-6 overflow-y-auto p-4 sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>
            {announcement ? 'Edit Announcement' : 'Create New Announcement'}
          </SheetTitle>
          <SheetDescription>
            {announcement
              ? 'Update the details of your announcement.'
              : 'Draft a new announcement to share with your customers or staff.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='announcement-form'
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex-1 space-y-6'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Summer Sale is Here!'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Write your message here...'
                      className='min-h-[100px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='targetAudience'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select audience' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='CUSTOMER'>Customer</SelectItem>
                        <SelectItem value='STAFF'>Staff</SelectItem>
                        <SelectItem value='ALL'>All</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='priority'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select priority' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='NORMAL'>Normal</SelectItem>
                        <SelectItem value='HIGH'>High (Urgent)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://example.com/image.jpg'
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a link to an image for the announcement banner.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-4 rounded-lg border bg-muted/50 p-4'>
              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between space-y-0 rounded-lg p-0'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>Active</FormLabel>
                      <FormDescription>
                        Make visible in the app immediately.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sendPushNotification'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-y-0 space-x-3'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Send Push Notification?</FormLabel>
                      <FormDescription>
                        This will also alert users via Push Notification on
                        their devices.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter>
              <Button type='submit'>
                {announcement ? 'Save Changes' : 'Create Announcement'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
