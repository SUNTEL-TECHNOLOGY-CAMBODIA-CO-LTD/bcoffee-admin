import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { getTranslation } from '@/utils/i18n'
import { useProducts, useDeleteProduct } from '@/hooks/queries/use-catalog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { BrandLoader } from '@/components/ui/brand-loader'
import { PageTitle } from '@/components/page-title'
import { ProductSheet } from '@/features/menu/components/product-sheet'
import { ProductsTable } from '@/features/menu/components/products-table'
import { type Product } from '@/features/menu/data/schema'

export const Route = createLazyFileRoute('/_authenticated/menu/products')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)

  const { data: response, isLoading } = useProducts()
  const { mutate: deleteProductMutation } = useDeleteProduct()
  const products = response?.data || []

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  const handleDelete = (product: Product) => {
    setDeleteProduct(product)
  }

  const confirmDelete = () => {
    if (!deleteProduct || !deleteProduct.id) return

    deleteProductMutation(deleteProduct.id, {
      onSuccess: () => {
        toast.success('Product deleted successfully')
        setDeleteProduct(null)
      },
      onError: (error) => {
        toast.error('Failed to delete product')
        console.error(error)
      },
    })
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setSelectedProduct(null)
    }
  }

  if (isLoading) {
    return (
      <div className='flex h-[80vh] w-full items-center justify-center'>
        <BrandLoader />
      </div>
    )
  }

  return (
    <div className='p-6'>
      <PageTitle
        title='Product'
        subtitle='Manage your global product catalog.'
        onClick={() => {
          setSelectedProduct(null)
          setOpen(true)
        }}
      />

      <ProductsTable
        data={products || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductSheet
        open={open}
        onOpenChange={handleSheetOpenChange}
        product={selectedProduct}
      />

      <AlertDialog
        open={!!deleteProduct}
        onOpenChange={(open) => !open && setDeleteProduct(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product{' '}
              <span className='font-medium text-foreground'>
                {deleteProduct ? getTranslation(deleteProduct.name) : ''}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className='text-destructive-foreground bg-destructive hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
