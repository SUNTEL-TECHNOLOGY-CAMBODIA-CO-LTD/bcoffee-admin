import { z } from 'zod'

export enum OptionType {
  VARIANT = 'VARIANT',
  MODIFIER = 'MODIFIER',
  ADDON = 'ADDON',
}

export const optionChoiceSchema = z.object({
  id: z.string().optional(), // Optional for new items
  sku: z.string().min(1, 'SKU is required'),
  name: z.record(z.string(), z.string()).refine((data) => !!data['en'], {
    message: 'English name is required',
  }),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
})

export type ProductOptionChoice = z.infer<typeof optionChoiceSchema>

export const optionGroupSchema = z.object({
  id: z.string().optional(),
  name: z.record(z.string(), z.string()).refine((data) => !!data['en'], {
    message: 'Group Name (EN) is required',
  }),
  type: z.nativeEnum(OptionType),
  sku: z.string().min(1, 'SKU is required'),
  minSelect: z.coerce.number().min(0, 'Min selection must be at least 0'),
  maxSelect: z.coerce.number().min(1, 'Max selection must be at least 1'),
  choices: z.array(optionChoiceSchema).default([]),
})

export type ProductOptionGroup = z.infer<typeof optionGroupSchema>

export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

// Mock Category Type
export interface Category {
  id: string
  name: Record<string, string>
  description?: Record<string, string>
  slug: string
  parentId?: string
  sortOrder: number
  imageUrl?: Record<string, string>
}

export const productRecipeSchema = z.object({
  ingredientId: z.string().min(1, 'Ingredient is required'),
  quantity: z.coerce.number().min(0, 'Quantity must be positive'),
})

export type ProductRecipe = z.infer<typeof productRecipeSchema>

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.record(z.string(), z.string()).refine((data) => !!data['en'], {
    message: 'Product Name (EN) is required',
  }),
  description: z.record(z.string(), z.string()).optional(),
  sku: z.string().min(1, 'SKU is required'),
  // basePrice removed
  price: optionGroupSchema, // Using existing optionGroupSchema for the price variant group
  priceGroupId: z.string().optional(), // ID of the price group if it exists
  categoryId: z.string().min(1, 'Category is required'),
  status: z.nativeEnum(ProductStatus),
  imageUrl: z.record(z.string(), z.string()).optional(),
  optionGroupIds: z.array(z.string()).default([]), // Array of Group IDs
  recipes: z.array(productRecipeSchema).default([]),
})

export type Product = z.infer<typeof productSchema>

export interface ProductAvailability {
  shopId: string
  productId: string
  isAvailable: boolean
  priceOverride: number | null
}
