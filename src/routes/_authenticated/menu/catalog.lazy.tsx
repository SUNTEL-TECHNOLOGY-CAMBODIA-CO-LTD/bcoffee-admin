import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductSheet } from '@/features/menu/components/product-sheet'
import { ProductsTable } from '@/features/menu/components/products-table'

export const Route = createLazyFileRoute('/_authenticated/menu/catalog')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)

  return (
    <div className='p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Master Catalog</h1>
          <p className='text-muted-foreground'>
            Manage your global product catalog.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className='mr-2 h-4 w-4' /> New Product
        </Button>
      </div>

      <ProductsTable />

      <ProductSheet open={open} onOpenChange={setOpen} />
    </div>
  )
}
