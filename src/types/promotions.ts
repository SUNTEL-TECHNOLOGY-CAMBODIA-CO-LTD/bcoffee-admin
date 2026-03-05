import { type DiscountType } from './growth'

export enum PromotionRuleType {
  CART_SUBTOTAL = 'CART_SUBTOTAL',
  PRODUCT_QUANTITY = 'PRODUCT_QUANTITY',
}

export enum PromotionOperator {
  GTE = 'GTE',
  LTE = 'LTE',
  EQ = 'EQ',
}

export interface PromotionTrigger {
  ruleType: PromotionRuleType
  operator: PromotionOperator
  value: number // Amount or Quantity
  targetIds?: string[] // Product IDs for PRODUCT_QUANTITY
}

export interface PromotionAction {
  actionType: DiscountType
  value: number
  applyToId?: string // Product ID for FIXED_PRICE or specific item discount
}

export interface PromotionMetadata {
  trigger: PromotionTrigger
  action: PromotionAction
  excludeDirty: boolean // Prevent double discounting
  priority: number // 0-100
  isStackable: boolean
}
