import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { PageTitle } from '@/components/page-title'
import { OptionGroupSheet } from '@/features/menu/components/option-group-sheet'
import { OptionGroupsTable } from '@/features/menu/components/option-groups-table'
import { type ProductOptionGroup } from '@/features/menu/data/schema'

export const Route = createLazyFileRoute('/_authenticated/menu/options')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<ProductOptionGroup | null>(
    null
  )

  const handleEdit = (group: ProductOptionGroup) => {
    setSelectedGroup(group)
    setOpen(true)
  }

  return (
    <div className='p-6'>
      <PageTitle
        title='Option Groups'
        subtitle='Manage variants, modifiers, and add-ons for your menu.'
        onClick={() => {
          setSelectedGroup(null)
          setOpen(true)
        }}
      />

      <OptionGroupsTable onEdit={handleEdit} />

      <OptionGroupSheet
        open={open}
        onOpenChange={setOpen}
        initialData={selectedGroup}
      />
    </div>
  )
}
