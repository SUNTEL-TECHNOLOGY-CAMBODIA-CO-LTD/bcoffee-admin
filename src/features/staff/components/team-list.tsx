import { useMemo } from 'react'
import { type Staff } from '@/types/staff'
import { DataTable } from '@/components/custom/data-table'
import { MOCK_STAFF } from '../data/mock-staff'
import { columns } from './team-columns'

interface TeamListProps {
  shopId: string
}

export function TeamList({ shopId }: TeamListProps) {
  const filteredData = useMemo(() => {
    return MOCK_STAFF.filter((staff) =>
      staff.access.some((a) => a.shopId === shopId)
    )
  }, [shopId])

  const handleResetPin = (staff: Staff) => {
    alert(`Resetting PIN for ${staff.fullName} (Mock Action)`)
  }

  return (
    <DataTable
      columns={columns}
      data={filteredData}
      searchKey='fullName'
      searchPlaceholder='Search team...'
      meta={{ shopId, onResetPin: handleResetPin }}
    />
  )
}
