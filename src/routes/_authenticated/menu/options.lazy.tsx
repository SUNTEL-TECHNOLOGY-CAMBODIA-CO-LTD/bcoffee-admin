import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { PageTitle } from '@/components/page-title'
import { OptionGroupSheet } from '@/features/menu/components/option-group-sheet'
import { OptionGroupsTable } from '@/features/menu/components/option-groups-table'

export const Route = createLazyFileRoute('/_authenticated/menu/options')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)

  return (
    <div className='p-6'>
      <PageTitle
        title='Option Groups'
        subtitle='Manage variants, modifiers, and add-ons for your menu.'
        onClick={() => setOpen(true)}
      />

      <OptionGroupsTable />

      <OptionGroupSheet open={open} onOpenChange={setOpen} />
    </div>
  )
}
