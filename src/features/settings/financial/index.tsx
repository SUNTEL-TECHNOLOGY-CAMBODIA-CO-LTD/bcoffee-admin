import { useState } from 'react'
import { DataTable } from '@/components/custom/data-table'
import { PageTitle } from '@/components/page-title'
import { MOCK_SURCHARGES, type Surcharge } from '../data/mock-settings'
import { columns } from './components/surcharges-columns'
import { SurchargeSheet } from './components/surcharges-sheet'

export default function FinancialSettingsPage() {
  const [open, setOpen] = useState(false)
  const [selectedSurcharge, setSelectedSurcharge] = useState<Surcharge | null>(
    null
  )

  const handleEdit = (surcharge: Surcharge) => {
    setSelectedSurcharge(surcharge)
    setOpen(true)
  }

  return (
    <div className='flex flex-col space-y-4 p-6 pt-6'>
      <PageTitle
        title='Financial Settings'
        subtitle='Manage taxes, surcharges, and service fees.'
        onClick={() => {
          setSelectedSurcharge(null)
          setOpen(true)
        }}
      />

      <DataTable
        columns={columns}
        data={MOCK_SURCHARGES}
        searchKey='name.en'
        searchPlaceholder='Filter surcharges...'
        meta={{ onEdit: handleEdit }}
      />

      <SurchargeSheet
        open={open}
        onOpenChange={setOpen}
        initialData={selectedSurcharge}
      />
    </div>
  )
}
