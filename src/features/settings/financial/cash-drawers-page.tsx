import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { type CashDrawerSession } from '../data/cash-drawer-schema'
import { MOCK_CASH_DRAWERS } from '../data/mock-cash-drawers'
import { CashDrawerSheet } from './components/cash-drawer-sheet'
import { CashDrawerTable } from './components/cash-drawer-table'

export function CashDrawersPage() {
  const [selectedSession, setSelectedSession] =
    useState<CashDrawerSession | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleViewDetails = (session: CashDrawerSession) => {
    setSelectedSession(session)
    setIsSheetOpen(true)
  }

  return (
    <div className='flex h-full flex-col space-y-6 p-8'>
      <PageTitle
        title='Cash Drawer History'
        subtitle='Audit cash handling, spot discrepancies, and review shift notes.'
      />

      <CashDrawerTable
        data={MOCK_CASH_DRAWERS}
        onViewDetails={handleViewDetails}
      />

      <CashDrawerSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        session={selectedSession}
      />
    </div>
  )
}
