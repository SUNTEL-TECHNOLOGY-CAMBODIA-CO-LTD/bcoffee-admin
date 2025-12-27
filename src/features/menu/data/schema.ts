import { z } from 'zod'

export enum OptionType {
  VARIANT = 'VARIANT',
  MODIFIER = 'MODIFIER',
  ADDON = 'ADDON',
}

export const optionChoiceSchema = z.object({
  id: z.string().optional(), // Optional for new items
  sku: z.string().min(1, 'SKU is required'),
  name: z.object({
    en: z.string().min(1, 'Name is required'),
  }),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
})

export type ProductOptionChoice = z.infer<typeof optionChoiceSchema>

export const optionGroupSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Group Name is required'),
  type: z.nativeEnum(OptionType),
  sku: z.string().min(1, 'SKU is required'),
  minSelect: z.coerce.number().min(0, 'Min selection must be at least 0'),
  maxSelect: z.coerce.number().min(1, 'Max selection must be at least 1'),
  options: z.array(optionChoiceSchema).default([]),
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
  name: { en: string }
  slug: string
  parentId?: string
  sortOrder: number
}

export const productRecipeSchema = z.object({
  ingredientId: z.string().min(1, 'Ingredient is required'),
  quantity: z.coerce.number().min(0, 'Quantity must be positive'),
})

export type ProductRecipe = z.infer<typeof productRecipeSchema>

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.object({
    en: z.string().min(1, 'Product Name is required'),
  }),
  description: z
    .object({
      en: z.string().optional(),
    })
    .optional(),
  sku: z.string().min(1, 'SKU is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  categoryId: z.string().min(1, 'Category is required'),
  status: z.nativeEnum(ProductStatus),
  imageUrl: z.string().optional(),
  optionGroups: z.array(z.string()).default([]), // Array of Group IDs
  recipes: z.array(productRecipeSchema).default([]),
})

export type Product = z.infer<typeof productSchema>

export interface ProductAvailability {
  shopId: string
  productId: string
  isAvailable: boolean
  priceOverride: number | null
}
