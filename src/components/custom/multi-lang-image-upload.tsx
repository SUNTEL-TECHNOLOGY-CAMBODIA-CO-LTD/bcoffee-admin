import * as React from 'react'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/config/locales'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useUploadProductImage } from '@/hooks/queries/use-media'
import { ImageUpload } from '@/components/ui/image-upload'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MultiLangImageUploadProps {
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function MultiLangImageUpload({
  value = {},
  onChange,
  label,
  className,
  disabled,
}: MultiLangImageUploadProps) {
  const [currentTab, setCurrentTab] = React.useState<string>(DEFAULT_LOCALE)
  const { mutateAsync: uploadImage } = useUploadProductImage()

  const handleImageChange = (url: string) => {
    // If clearing the image (empty string), we might want to remove the key entirely
    // or just set it to empty string. Setting to empty string is fine.
    const newValue = {
      ...value,
      [currentTab]: url,
    }

    // Optional: Clean up empty keys if desired, but not strictly necessary
    if (!url) {
      delete newValue[currentTab]
      // We probably need to pass a new object reference
      onChange({ ...newValue })
    } else {
      onChange(newValue)
    }
  }

  const currentValue = value?.[currentTab] || ''

  const handleUpload = async (file: File) => {
    try {
      const response = await uploadImage(file)
      // Response format: { raw: string, xs: string, sm: string, md: string, lg: string }
      // We prioritize 'lg' for display, falling back to 'raw'
      if (typeof response === 'object' && response !== null) {
        const typedResponse = response as {
          lg?: string
          raw?: string
          [key: string]: string | undefined
        }
        if (typedResponse.lg) return typedResponse.lg
        if (typedResponse.raw) return typedResponse.raw
      }

      if (typeof response === 'string') return response

      // Fallback
      return response as unknown as string
    } catch (error) {
      toast.error('Failed to upload image')
      throw error
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className='flex items-center justify-between'>
        {label && <Label>{label}</Label>}
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className='w-auto'
        >
          <TabsList className='h-7 p-0.5'>
            {SUPPORTED_LOCALES.map((locale) => (
              <TabsTrigger
                key={locale.code}
                value={locale.code}
                className='relative h-6 px-2 text-xs'
              >
                <span className='mr-1'>{locale.flag}</span>
                {locale.code.toUpperCase()}
                {value[locale.code] && (
                  <span className='absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-green-500' />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <ImageUpload
        value={currentValue}
        onChange={handleImageChange}
        onUpload={handleUpload}
        disabled={disabled}
      />
    </div>
  )
}
