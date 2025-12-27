import { z } from 'zod'

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  bannerUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
  productIds: z.array(z.string()).default([]), // For UI handling of relations
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Collection = z.infer<typeof collectionSchema>

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: '1',
    name: 'Trending Now',
    slug: 'trending-now',
    bannerUrl: 'https://images.unsplash.com/photo-1509042239860-f450fa2cb51c',
    isActive: true,
    productIds: ['1', '2', '3'], // Assuming these IDs exist in mock-products
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Breakfast Combos',
    slug: 'breakfast-combos',
    bannerUrl: 'https://images.unsplash.com/photo-1525351460165-276635db699f',
    isActive: true,
    productIds: ['4', '5'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
