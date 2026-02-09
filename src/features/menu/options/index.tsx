import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { type ProductOptionGroup } from '../data/schema'
import { OptionGroupSheet } from './_components/option-group-sheet'
import { OptionGroupsTable } from './_components/option-groups-table'

export default function OptionsPage() {
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
