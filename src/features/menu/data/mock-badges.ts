import { type Badge } from './badge-schema'

export const MOCK_BADGES: Badge[] = [
  {
    id: '1',
    label: 'Best Seller',
    code: 'BEST_SELLER',
    bgColor: '#FF5733',
    textColor: '#FFFFFF',
    isActive: true,
  },
  {
    id: '2',
    label: 'New',
    code: 'NEW_ITEM',
    bgColor: '#33FF57',
    textColor: '#000000',
    isActive: true,
  },
  {
    id: '3',
    label: 'Spicy',
    code: 'SPICY',
    bgColor: '#FF0000',
    textColor: '#FFFFFF',
    isActive: true,
  },
  {
    id: '4',
    label: 'Vegan',
    code: 'VEGAN',
    bgColor: '#33C4FF',
    textColor: '#000000',
    isActive: false,
  },
]
