import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { InventoryForm, type InventoryFormValues } from './inventory-form'

export function InventorySheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const handleSubmit = (data: InventoryFormValues) => {
    // eslint-disable-next-line no-console
    console.log('New Item Created:', data)
    // Here we would typically call an API
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='p-4 sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>Manage Shop Inventory</SheetTitle>
          <SheetDescription>
            Add or update stock for ingredients in this shop. Click save when
            you're done.
          </SheetDescription>
        </SheetHeader>
        <div className='mt-6'>
          <InventoryForm onSubmit={handleSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
