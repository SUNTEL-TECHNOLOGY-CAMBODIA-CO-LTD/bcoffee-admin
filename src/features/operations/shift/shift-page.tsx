import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { ActiveShiftDashboard } from './components/active-shift-dashboard'
import { StartShiftCard } from './components/start-shift-card'
import { type ShiftSession } from './data/shift-schema'

export function ShiftPage() {
  // Mock State: Start with NO ACTIVE session to demonstrate the "Start" flow,
  // or use the MOCK_ACTIVE_SHIFT for "Active" flow.
  // Let's toggle initially based on a "no session" state to show the full flow if possible,
  // or just default one. Given the prompt implies testing both, let's start with NULL (Closed).

  const [currentSession, setCurrentSession] = useState<ShiftSession | null>(
    null
  )

  // Dev Toggle for easier review (Optional, but helpful for demo)
  // const [currentSession, setCurrentSession] = useState<ShiftSession | null>(MOCK_ACTIVE_SHIFT)

  const handleStartShift = (openingBalance: number) => {
    // Create new session
    const newSession: ShiftSession = {
      id: `shift-${Date.now()}`,
      shopId: 'shop-1',
      userId: 'u1',
      userName: 'Current User', // In real app, get from auth context
      startedAt: new Date(),
      openingBalance,
      cashSales: 0,
      expectedTotal: openingBalance,
      status: 'OPEN',
    }
    setCurrentSession(newSession)
  }

  const handleCloseShift = (closingBalance: number, _note: string) => {
    if (!currentSession) return

    const difference = closingBalance - currentSession.expectedTotal

    // End session
    setCurrentSession(null)
    // In real app, redirect to report or show success toast
    alert(
      `Shift Closed. Final Difference: ${difference >= 0 ? '+' : ''}$${difference.toFixed(2)}`
    )
  }

  return (
    <div className='flex h-full flex-col space-y-6 p-8'>
      <PageTitle
        title='Shift Management'
        subtitle='Open and close the register, track cash sales, and reconcile drawer.'
      />

      <div className='flex flex-1 flex-col justify-center pb-20'>
        {currentSession ? (
          <ActiveShiftDashboard
            session={currentSession}
            onCloseShift={handleCloseShift}
          />
        ) : (
          <StartShiftCard onStartShift={handleStartShift} />
        )}
      </div>
    </div>
  )
}
