// Align with DB Enums
export enum DiscountType {
  FIXED = 'FIXED', // e.g., $5 off
  PERCENTAGE = 'PERCENTAGE', // e.g., 10% off
  FIXED_PRICE = 'FIXED_PRICE', // e.g., Buy for $10
}

export enum PromotionScope {
  CART = 'CART', // Applies to total
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
}

export interface Promotion {
  id: string
  name: { en: string }
  description?: { en: string }
  code?: string // e.g., "SUMMER2025"
  type: DiscountType
  value: number // Decimal in DB
  scope: PromotionScope
  targetSku?: string // Only if scope is PRODUCT
  startDate?: string // Date string
  endDate?: string
  budgetLimitAmount?: number
  totalAmountBurned: number // Usage tracking
  isActive: boolean
}

export interface Customer {
  id: string
  fullName: string
  phone: string
  status: 'ACTIVE' | 'BANNED' | 'PENDING'
  createdAt: string
}

export interface Voucher {
  id: string
  uniqueCode: string // The specific code user types
  promotionName: string // Joined from Promotion
  userPhone: string // Joined from User
  isRedeemed: boolean
  createdAt: string
}

export type ReviewTarget = 'SHOP' | 'PRODUCT'

export interface ReviewReply {
  text: string
  createdAt: string
}

export interface Review {
  id: string
  shopId: string
  authorName: string // From customer join
  rating: number // 1-5
  content: string
  tags: string[]

  targetType: ReviewTarget
  targetName: string // "Shop 01" or "Cappuccino"

  reply?: ReviewReply | null

  createdAt: string
}
