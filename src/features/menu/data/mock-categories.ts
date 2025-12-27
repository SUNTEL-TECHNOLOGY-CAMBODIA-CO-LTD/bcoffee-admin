export interface Category {
  id: string
  name: { en: string }
  slug: string
  parentId?: string
  sortOrder: number
}

export const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: { en: 'Coffee' },
    slug: 'coffee',
    sortOrder: 1,
  },
  {
    id: '2',
    name: { en: 'Hot Coffee' },
    slug: 'hot-coffee',
    parentId: '1',
    sortOrder: 1,
  },
  {
    id: '3',
    name: { en: 'Cold Coffee' },
    slug: 'cold-coffee',
    parentId: '1',
    sortOrder: 2,
  },
  {
    id: '4',
    name: { en: 'Pastries' },
    slug: 'pastries',
    sortOrder: 2,
  },
]
