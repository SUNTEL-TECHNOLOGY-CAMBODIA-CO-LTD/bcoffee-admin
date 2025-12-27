import { createLazyFileRoute } from '@tanstack/react-router'
import StoreProfileForm from '@/features/settings/store/index'

export const Route = createLazyFileRoute('/_authenticated/settings/store')({
  component: StoreProfileForm,
})
