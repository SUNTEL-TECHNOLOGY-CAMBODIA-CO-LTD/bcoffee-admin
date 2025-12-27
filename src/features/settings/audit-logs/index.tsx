import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { type AuditLog } from '../data/audit-log-schema'
import { MOCK_AUDIT_LOGS } from '../data/mock-audit-logs'
import { AuditLogsTable } from './audit-logs-table'
import { LogDetailsSheet } from './log-details-sheet'

export function AuditLogsPage() {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log)
    setIsSheetOpen(true)
  }

  return (
    <div className='flex h-full flex-col space-y-6 p-8'>
      <PageTitle
        title='Audit Logs'
        subtitle='Searchable history of sensitive actions taken by staff.'
      />

      <AuditLogsTable
        data={MOCK_AUDIT_LOGS}
        onViewDetails={handleViewDetails}
      />

      <LogDetailsSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        log={selectedLog}
      />
    </div>
  )
}
