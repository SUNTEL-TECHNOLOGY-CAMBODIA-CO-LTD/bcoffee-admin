import { type Announcement } from './announcement-schema'

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    businessId: 'biz-1',
    title: 'New Summer Menu Launch! ☀️',
    content:
      'Check out our refreshing new drinks for the summer season. Available now at all locations.',
    targetAudience: 'CUSTOMER',
    priority: 'HIGH',
    isActive: true,
    publishedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ann-2',
    businessId: 'biz-1',
    title: 'Staff Meeting Reminder',
    content:
      'All hands meeting this Friday at 9 AM. Coffee and donuts provided.',
    targetAudience: 'STAFF',
    priority: 'NORMAL',
    isActive: true,
    publishedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ann-3',
    businessId: 'biz-1',
    title: 'Holiday Hours Update',
    content: 'We will be closing early on Christmas Eve at 4 PM.',
    targetAudience: 'ALL',
    priority: 'HIGH',
    isActive: false,
    publishedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
