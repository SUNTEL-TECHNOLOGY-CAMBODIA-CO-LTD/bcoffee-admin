import { createLazyFileRoute } from '@tanstack/react-router'
import RolesPage from '@/features/settings/roles/roles-page'

export const Route = createLazyFileRoute('/_authenticated/settings/roles')({
  component: RolesPage,
})
