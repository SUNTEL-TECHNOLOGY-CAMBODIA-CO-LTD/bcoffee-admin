import { type Product, ProductStatus } from './schema'

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_latte',
    name: { en: 'Latte' },
    sku: 'LATTE-001',
    price: 4.5,
    categoryId: '2', // Hot Coffee
    status: ProductStatus.ACTIVE,
    optionGroups: ['grp_milk_alt', 'grp_syrups'],
    recipes: [
      { ingredientId: 'ing_beans', quantity: 18 },
      { ingredientId: 'ing_milk', quantity: 250 },
    ],
  },
  {
    id: 'prod_espresso',
    name: { en: 'Espresso' },
    sku: 'ESP-001',
    price: 3.0,
    categoryId: '2', // Hot Coffee
    status: ProductStatus.ACTIVE,
    optionGroups: [],
    recipes: [{ ingredientId: 'ing_beans', quantity: 18 }],
  },
  {
    id: 'prod_croissant',
    name: { en: 'Croissant' },
    sku: 'PAST-001',
    price: 3.5,
    categoryId: '4', // Pastries
    status: ProductStatus.DRAFT,
    optionGroups: [],
    recipes: [],
  },
]
