import { createLazyFileRoute } from '@tanstack/react-router'
import VouchersPage from '@/features/growth/vouchers'

export const Route = createLazyFileRoute('/_authenticated/growth/vouchers')({
  component: VouchersPage,
})
