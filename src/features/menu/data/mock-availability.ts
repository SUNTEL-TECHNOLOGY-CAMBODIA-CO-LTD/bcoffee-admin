import { type ProductAvailability } from './schema'

export const MOCK_PRODUCT_AVAILABILITY: ProductAvailability[] = [
  // Latte: Available in both
  {
    shopId: 'shop_01',
    productId: 'prod_latte',
    isAvailable: true,
    priceOverride: null, // Uses base price 4.5
  },
  {
    shopId: 'shop_02',
    productId: 'prod_latte',
    isAvailable: true,
    priceOverride: 5.0, // More expensive at Shop 2
  },

  // Espresso: Available only in Shop 1
  {
    shopId: 'shop_01',
    productId: 'prod_espresso',
    isAvailable: true,
    priceOverride: null,
  },
  {
    shopId: 'shop_02',
    productId: 'prod_espresso',
    isAvailable: false,
    priceOverride: null,
  },

  // Croissant: Not available
  {
    shopId: 'shop_01',
    productId: 'prod_croissant',
    isAvailable: false,
    priceOverride: null,
  },
  {
    shopId: 'shop_02',
    productId: 'prod_croissant',
    isAvailable: false,
    priceOverride: null,
  },
]
