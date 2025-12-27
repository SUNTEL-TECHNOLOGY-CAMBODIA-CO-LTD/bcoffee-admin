import { subDays, subHours } from 'date-fns'
import { type Review } from '@/types/growth'

const now = new Date()

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    shopId: 'shop_01',
    authorName: 'Alice Johnson',
    rating: 5,
    content:
      'Absolutely love the atmosphere here! The staff is super friendly and the wifi is fast. Best place to work remotely.',
    tags: ['Ambience', 'Service', 'Wifi'],
    targetType: 'SHOP',
    targetName: 'B Quick Coffee - Downtown',
    reply: {
      text: 'Thank you so much Alice! We are glad you enjoy the space. See you soon!',
      createdAt: subDays(now, 1).toISOString(),
    },
    createdAt: subDays(now, 2).toISOString(),
  },
  {
    id: 'rev_2',
    shopId: 'shop_01',
    authorName: 'Bob Smith',
    rating: 3,
    content:
      'The coffee was good but it was served lukewarm. A bit disappointing for the price.',
    tags: ['Temperature', 'Value'],
    targetType: 'PRODUCT',
    targetName: 'Hot Latte',
    reply: null,
    createdAt: subHours(now, 5).toISOString(),
  },
  {
    id: 'rev_3',
    shopId: 'shop_02',
    authorName: 'Charlie',
    rating: 1,
    content:
      'Order took 20 minutes to arrive and they got it wrong. Not coming back.',
    tags: ['Speed', 'Accuracy'],
    targetType: 'SHOP',
    targetName: 'B Coffee Lab',
    reply: null,
    createdAt: subHours(now, 1).toISOString(),
  },
  {
    id: 'rev_4',
    shopId: 'shop_01',
    authorName: 'Diana',
    rating: 4,
    content: 'Great pastries! The croissant was fresh and flaky.',
    tags: ['Food Quality'],
    targetType: 'PRODUCT',
    targetName: 'Butter Croissant',
    reply: {
      text: 'Thanks Diana! Our bakers start at 4am every day to ensure freshness.',
      createdAt: subDays(now, 3).toISOString(),
    },
    createdAt: subDays(now, 4).toISOString(),
  },
  {
    id: 'rev_5',
    shopId: 'shop_02',
    authorName: 'Evan',
    rating: 5,
    content: 'The new seasonal blend is fantastic. Highly recommend!',
    tags: ['Taste', 'New Item'],
    targetType: 'PRODUCT',
    targetName: 'Winter Blend',
    reply: null,
    createdAt: subHours(now, 12).toISOString(),
  },
]
