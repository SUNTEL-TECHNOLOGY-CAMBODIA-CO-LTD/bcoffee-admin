import { createLazyFileRoute } from '@tanstack/react-router'
import CategoriesPage from '@/features/menu/categories/index'

export const Route = createLazyFileRoute('/_authenticated/menu/categories')({
  component: CategoriesPage,
})
