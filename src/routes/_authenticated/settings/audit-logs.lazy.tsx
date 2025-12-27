import { createLazyFileRoute } from '@tanstack/react-router'
import { AuditLogsPage } from '@/features/settings/audit-logs'

export const Route = createLazyFileRoute('/_authenticated/settings/audit-logs')(
  {
    component: AuditLogsPage,
  }
)
