import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { type MobileAppVersion } from '../../data/mobile-app-schema'

const formSchema = z.object({
  latestVersion: z.string().min(1, 'Latest version is required'),
  minUsableVersion: z.string().min(1, 'Min usable version is required'),
  updateUrl: z.string().url('Must be a valid URL'),
})

type FormValues = z.infer<typeof formSchema>

interface EditVersionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  version: MobileAppVersion | null
  onSave: (id: string, data: FormValues) => void
}

export function EditVersionSheet({
  open,
  onOpenChange,
  version,
  onSave,
}: EditVersionSheetProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latestVersion: '',
      minUsableVersion: '',
      updateUrl: '',
    },
  })

  useEffect(() => {
    if (version) {
      form.reset({
        latestVersion: version.latestVersion,
        minUsableVersion: version.minUsableVersion,
        updateUrl: version.updateUrl,
      })
    }
  }, [version, form])

  const handleSubmit = (data: FormValues) => {
    if (version) {
      onSave(version.id, data)
      onOpenChange(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col gap-6 p-4 sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>
            Edit {version?.platform === 'ios' ? 'iOS' : 'Android'} Version
          </SheetTitle>
          <SheetDescription>
            Update the version details for the{' '}
            {version?.platform === 'ios' ? 'iOS' : 'Android'} app.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex-1 space-y-6'
          >
            <FormField
              control={form.control}
              name='latestVersion'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latest Version</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., 2.1.0' {...field} />
                  </FormControl>
                  <FormDescription>
                    The most recent version available in the store.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='minUsableVersion'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Usable Version</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., 2.0.0' {...field} />
                  </FormControl>
                  <FormDescription>
                    Users below this version will be forced to update.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='updateUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store URL</FormLabel>
                  <FormControl>
                    <Input placeholder='https://...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className='flex flex-row justify-end'>
              <Button type='submit'>Save Changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
