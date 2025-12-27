import { useState } from 'react'
import {
  MOCK_MOBILE_APP_VERSIONS,
  type MobileAppVersion,
} from '../data/mobile-app-schema'
import { EditVersionSheet } from './components/edit-version-sheet'
import { MobileAppTable } from './components/mobile-app-table'

export default function MobileAppPage() {
  const [data, setData] = useState<MobileAppVersion[]>(MOCK_MOBILE_APP_VERSIONS)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingVersion, setEditingVersion] = useState<MobileAppVersion | null>(
    null
  )

  const handleEdit = (version: MobileAppVersion) => {
    setEditingVersion(version)
    setSheetOpen(true)
  }

  const handleSave = (id: string, updatedData: Partial<MobileAppVersion>) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedData, updatedAt: new Date().toISOString() }
          : item
      )
    )
    setSheetOpen(false)
    setEditingVersion(null)
  }

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open)
    if (!open) {
      setEditingVersion(null)
    }
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center justify-between space-y-2 p-4 md:p-8'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Mobile App Versions
          </h2>
          <p className='text-muted-foreground'>
            Manage the latest and minimum supported versions for your mobile
            apps.
          </p>
        </div>
      </div>
      <div className='flex-1 flex-col space-y-8 p-8 pt-4'>
        <MobileAppTable data={data} onEdit={handleEdit} />
      </div>

      <EditVersionSheet
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
        version={editingVersion}
        onSave={handleSave}
      />
    </div>
  )
}
