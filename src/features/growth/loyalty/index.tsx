import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import {
  type LoyaltySettings,
  type UserLoyaltyBalance,
} from '../data/loyalty-schema'
import {
  MOCK_LOYALTY_SETTINGS,
  MOCK_USER_LOYALTY_BALANCES,
} from '../data/mock-loyalty'
import { AdjustBalanceDialog } from './components/adjust-balance-dialog'
import { CustomerBalanceTable } from './components/customer-balance-table'
import { LoyaltySettingsForm } from './components/loyalty-settings-form'

export default function LoyaltyPage() {
  // In a real app, these would come from API
  const [settings, setSettings] = useState<LoyaltySettings>(
    MOCK_LOYALTY_SETTINGS
  )
  const [balances, setBalances] = useState<UserLoyaltyBalance[]>(
    MOCK_USER_LOYALTY_BALANCES
  )
  const [adjustUser, setAdjustUser] = useState<UserLoyaltyBalance | null>(null)

  const handleSaveSettings = (data: LoyaltySettings) => {
    setSettings(data)
    // Here you would call API to save settings
    // console.log('Saved settings:', data)
    alert(JSON.stringify(data, null, 2))
  }

  const handleAdjustBalance = (amount: number, _reason: string) => {
    if (!adjustUser) return

    const updatedBalances = balances.map((u) => {
      if (u.userId === adjustUser.userId) {
        return { ...u, pointsBalance: u.pointsBalance + amount }
      }
      return u
    })
    setBalances(updatedBalances)
    // console.log(
    //   `Adjusted user ${adjustUser.userId} by ${amount}. Reason: ${reason}`
    // )
  }

  return (
    <div className='flex flex-col space-y-6 p-8'>
      <PageTitle
        title='Loyalty & Referrals'
        subtitle='Configure points earning rules and manage customer balances.'
      />

      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='space-y-8 lg:col-span-2'>
          <LoyaltySettingsForm
            initialData={settings}
            onSave={handleSaveSettings}
          />

          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Customer Balances</h3>
            <CustomerBalanceTable data={balances} onAdjust={setAdjustUser} />
          </div>
        </div>

        {/* Helper / Info Column */}
        <div className='space-y-6'>
          <div className='rounded-lg border border-blue-100 bg-blue-50 p-4 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100'>
            <h4 className='mb-2 font-semibold'>How it works</h4>
            <ul className='list-inside list-disc space-y-1 text-sm'>
              <li>Customers earn points automatically on checkout.</li>
              <li>Points can be redeemed for discounts during payment.</li>
              <li>
                Referral bonuses apply when a new user completes their first
                order.
              </li>
            </ul>
          </div>
          <div className='rounded-lg border border-yellow-100 bg-yellow-50 p-4 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100'>
            <h4 className='mb-2 font-semibold'>Tips</h4>
            <p className='text-sm'>
              Set the redemption rate carefully to manage your margins. A common
              rate is 100 points = $1.
            </p>
          </div>
        </div>
      </div>

      <AdjustBalanceDialog
        open={!!adjustUser}
        onOpenChange={(open) => !open && setAdjustUser(null)}
        user={adjustUser}
        onConfirm={handleAdjustBalance}
      />
    </div>
  )
}
