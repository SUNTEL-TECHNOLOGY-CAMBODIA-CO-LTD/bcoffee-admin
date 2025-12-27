import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { type Announcement } from '../data/announcement-schema'
import { MOCK_ANNOUNCEMENTS } from '../data/mock-announcements'
import { AnnouncementSheet } from './components/announcement-sheet'
import { AnnouncementsTable } from './components/announcements-table'

export default function AnnouncementsPage() {
  const [data, setData] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null)

  const handleCreate = () => {
    setEditingAnnouncement(null)
    setIsSheetOpen(true)
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setIsSheetOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setData((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleSave = (formValues: Partial<Announcement>) => {
    if (editingAnnouncement) {
      // Update
      setData((prev) =>
        prev.map((item) =>
          item.id === editingAnnouncement.id
            ? ({
                ...item,
                ...formValues,
                updatedAt: new Date(),
              } as Announcement)
            : item
        )
      )
    } else {
      // Create
      const newAnnouncement: Announcement = {
        id: `ann-${Date.now()}`,
        businessId: 'biz-1',
        title: formValues.title || '',
        content: formValues.content || '',
        targetAudience: formValues.targetAudience || 'CUSTOMER',
        priority: formValues.priority || 'NORMAL',
        isActive: formValues.isActive ?? true,
        imageUrl: formValues.imageUrl,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setData((prev) => [newAnnouncement, ...prev])
    }
  }

  return (
    <div className='flex h-full flex-col space-y-6 p-8'>
      <PageTitle
        title='Announcements & News'
        subtitle='Manage in-app news feeds and push notifications for customers and staff.'
        buttonLabel='New Announcement'
        onClick={handleCreate}
      />

      <AnnouncementsTable
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AnnouncementSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        announcement={editingAnnouncement}
        onSave={handleSave}
      />
    </div>
  )
}
