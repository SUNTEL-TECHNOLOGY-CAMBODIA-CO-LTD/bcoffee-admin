import { createLazyFileRoute } from '@tanstack/react-router'
import OptionsPage from '@/features/menu/options/index'

export const Route = createLazyFileRoute('/_authenticated/menu/options')({
  component: OptionsPage,
})
