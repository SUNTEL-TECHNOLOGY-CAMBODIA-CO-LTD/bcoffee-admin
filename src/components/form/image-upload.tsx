import { forwardRef } from 'react'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ImageUpload as UIImageUpload } from '@/components/ui/image-upload'

interface ImageUploadProps {
  value?: string | null
  onChange: (value: string | null) => void
  onUpload: (file: File) => Promise<string>
  disabled?: boolean
  label?: string
  className?: string
}

export const ImageUpload = forwardRef<HTMLDivElement, ImageUploadProps>(
  ({ value, onChange, onUpload, disabled, label, className }, ref) => {
    return (
      <FormItem className={className} ref={ref}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <UIImageUpload
            value={value || ''}
            onChange={(val) => onChange(val || null)}
            onUpload={onUpload}
            disabled={disabled}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )
  }
)

ImageUpload.displayName = 'ImageUpload'
