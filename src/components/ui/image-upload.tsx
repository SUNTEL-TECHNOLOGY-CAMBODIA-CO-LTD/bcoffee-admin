import { useState, useRef, useCallback, useEffect } from 'react'
import { ImagePlus, X, UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  onUpload?: (file: File) => Promise<string>
  disabled?: boolean
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  onUpload,
  disabled,
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState(value)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync preview with value prop
  useEffect(() => {
    setPreview(value)
  }, [value])

  const processFile = useCallback(
    async (file: File) => {
      if (file && file.type.startsWith('image/')) {
        // Create local preview immediately
        const localUrl = URL.createObjectURL(file)
        setPreview(localUrl)

        if (onUpload) {
          try {
            setIsUploading(true)
            const uploadedUrl = await onUpload(file)
            onChange(uploadedUrl)
            // Update preview to the real URL (though it might look the same)
            setPreview(uploadedUrl)
          } catch (error) {
            console.error('Upload failed:', error)
            setPreview(value) // Revert to original value on failure
            // Optional: you could call a passed onError or show toast here
          } finally {
            setIsUploading(false)
          }
        } else {
          // Default behavior if no uploader provided
          onChange(localUrl)
        }
      }
    },
    [onChange, onUpload, value]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled && !isUploading) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled || isUploading) return

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleRemove = () => {
    setPreview('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div
        className={cn(
          'relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 p-4 transition-colors hover:bg-muted/10',
          isDragging && 'border-primary bg-primary/5',
          (disabled || isUploading) && 'cursor-not-allowed opacity-60'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          !preview && !isUploading && fileInputRef.current?.click()
        }
      >
        <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          accept='image/png, image/jpeg, image/webp'
          onChange={handleFileChange}
          disabled={disabled || isUploading}
        />

        {isUploading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-background/50'>
            <UploadCloud className='h-8 w-8 animate-bounce text-primary' />
          </div>
        )}

        {preview ? (
          <div className='relative aspect-video w-full max-w-sm overflow-hidden rounded-md'>
            <img
              src={preview}
              alt='Upload preview'
              className='h-full w-full object-cover'
            />
            {!isUploading && (
              <Button
                type='button'
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
                variant='destructive'
                size='icon'
                className='absolute top-2 right-2 h-8 w-8'
                disabled={disabled}
              >
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-2 text-center'>
            <div className='rounded-full bg-background p-4 shadow-sm ring-1 ring-border'>
              {isDragging ? (
                <UploadCloud className='h-8 w-8 animate-bounce text-primary' />
              ) : (
                <ImagePlus className='h-8 w-8 text-muted-foreground' />
              )}
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-foreground'>
                {isDragging
                  ? 'Drop image here'
                  : 'Click or drag image to upload'}
              </p>
              <p className='text-xs text-muted-foreground'>
                Recommended: 800x800px (1:1) or 1200x900px (4:3)
              </p>
              <p className='text-xs text-muted-foreground/75'>
                JPG, PNG or WEBP. Max 5MB.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
