import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useCategories } from '@/hooks/queries/use-catalog'
import { BrandLoader } from '@/components/ui/brand-loader'
import { PageTitle } from '@/components/page-title'
import { CategoriesTable } from '@/features/menu/components/categories-table'
import { CategorySheet } from '@/features/menu/components/category-sheet'
import { type Category } from '@/features/menu/data/mock-categories'

export const Route = createLazyFileRoute('/_authenticated/menu/categories')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<
    | (React.ComponentProps<typeof CategorySheet>['initialData'] & {
        id?: string
      })
    | null
  >(null)

  const { data: categories, isLoading } = useCategories()

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setOpen(true)
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
        title='Categories'
        subtitle='Manage your menu categories and structure.'
        onClick={() => {
          setSelectedCategory(null)
          setOpen(true)
        }}
      />

      <CategoriesTable
        data={(categories as Category[]) || []}
        onEdit={handleEdit}
      />

      <CategorySheet
        open={open}
        onOpenChange={setOpen}
        initialData={
          selectedCategory
            ? {
                id: selectedCategory?.id || undefined,
                name: selectedCategory?.name || {},
                slug: selectedCategory?.slug || '',
                sortOrder: selectedCategory?.sortOrder || 0,
                description: selectedCategory?.description || undefined,
                parentId: selectedCategory?.parentId || undefined,
                imageUrl: selectedCategory?.imageUrl || {},
              }
            : null
        }
      />
    </div>
  )
}
