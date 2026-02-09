import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { type Badge } from '../data/badge-schema'
import { MOCK_BADGES } from '../data/mock-badges'
import { BadgeSheet } from './_components/badge-sheet'
import { BadgeTable } from './_components/badge-table'

export function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>(MOCK_BADGES)
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleEdit = (badge: Badge) => {
    setSelectedBadge(badge)
    setIsSheetOpen(true)
  }

  const handleCreate = () => {
    setSelectedBadge(null)
    setIsSheetOpen(true)
  }

  const handleSave = (savedBadge: Badge) => {
    setBadges((currentBadges) => {
      const exists = currentBadges.some((b) => b.id === savedBadge.id)
      if (exists) {
        return currentBadges.map((b) =>
          b.id === savedBadge.id ? savedBadge : b
        )
      }
      return [...currentBadges, savedBadge]
    })
  }

  const handleDelete = (badgeToDelete: Badge) => {
    if (confirm('Are you sure you want to delete this badge?')) {
      setBadges((current) => current.filter((b) => b.id !== badgeToDelete.id))
    }
  }

  return (
    <div className='flex h-full flex-col space-y-6 p-6'>
      <PageTitle
        title='Marketing Badges'
        subtitle='Manage badges for product labeling (e.g., Best Seller, New, Spicy).'
        buttonLabel='Create Badge'
        onClick={handleCreate}
      />

      <BadgeTable data={badges} onEdit={handleEdit} onDelete={handleDelete} />

      <BadgeSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        badge={selectedBadge}
        onSave={handleSave}
      />
    </div>
  )
}
