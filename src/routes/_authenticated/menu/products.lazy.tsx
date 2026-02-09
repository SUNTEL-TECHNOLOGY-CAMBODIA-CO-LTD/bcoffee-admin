import { createLazyFileRoute } from '@tanstack/react-router'
import ProductsPage from '@/features/menu/products/index'

export const Route = createLazyFileRoute('/_authenticated/menu/products')({
  component: ProductsPage,
})
