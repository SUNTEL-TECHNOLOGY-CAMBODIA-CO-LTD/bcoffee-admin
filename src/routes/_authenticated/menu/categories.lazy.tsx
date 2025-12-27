import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { PageTitle } from '@/components/page-title'
import { CategoriesTable } from '@/features/menu/components/categories-table'
import { CategorySheet } from '@/features/menu/components/category-sheet'
import { type Category } from '@/features/menu/data/mock-categories'

export const Route = createLazyFileRoute('/_authenticated/menu/categories')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] =
    useState<React.ComponentProps<typeof CategorySheet>['initialData']>(null)

  const handleEdit = (category: Category) => {
    setSelectedCategory({
      name: category.name.en,
      slug: category.slug,
      parentId: category.parentId,
      sortOrder: category.sortOrder,
    })
    setOpen(true)
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

      <CategoriesTable onEdit={handleEdit} />

      <CategorySheet
        open={open}
        onOpenChange={setOpen}
        initialData={selectedCategory}
      />
    </div>
  )
}
