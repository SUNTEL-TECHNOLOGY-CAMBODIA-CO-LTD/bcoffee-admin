import { createLazyFileRoute } from '@tanstack/react-router'
import MobileAppPage from '@/features/settings/mobile-app'

export const Route = createLazyFileRoute('/_authenticated/settings/mobile-app')(
  {
    component: MobileAppPage,
  }
)
