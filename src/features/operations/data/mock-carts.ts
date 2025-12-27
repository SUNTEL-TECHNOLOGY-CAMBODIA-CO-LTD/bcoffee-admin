import { subMinutes, subHours } from 'date-fns'
import { type Cart } from './cart-schema'

export const MOCK_CARTS: Cart[] = [
  {
    id: 'cart-1',
    user: {
      id: 'user-1',
      fullName: 'Alice Johnson',
      phone: '+1 555-0101',
    },
    updatedAt: subMinutes(new Date(), 5),
    createdAt: subMinutes(new Date(), 20),
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Caramel Macchiato',
        quantity: 2,
        unitPrice: 4.5,
        options: [
          { name: 'Size', value: 'Large', price: 0.5 },
          { name: 'Milk', value: 'Oat Milk', price: 0.5 },
        ],
        instructions: 'Extra foam please',
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Croissant',
        quantity: 1,
        unitPrice: 3.0,
      },
    ],
  },
  {
    id: 'cart-2',
    user: {
      id: 'user-2',
      fullName: 'Bob Smith',
      phone: '+1 555-0102',
    },
    updatedAt: subHours(new Date(), 2), // Older than 1 hour -> should be highlighted
    createdAt: subHours(new Date(), 3),
    items: [
      {
        id: 'item-3',
        productId: 'prod-3',
        productName: 'Iced Americano',
        quantity: 1,
        unitPrice: 3.5,
        options: [{ name: 'Shots', value: 'Extra Shot', price: 0.8 }],
      },
    ],
  },
  {
    id: 'cart-3',
    user: {
      id: 'user-3',
      fullName: undefined, // Guest / Unknown name? DB spec says fullName is optional
      phone: '+1 555-0103',
    },
    updatedAt: subMinutes(new Date(), 45),
    createdAt: subHours(new Date(), 1),
    items: [
      {
        id: 'item-4',
        productId: 'prod-4',
        productName: 'Matcha Latte',
        quantity: 1,
        unitPrice: 5.0,
      },
      {
        id: 'item-5',
        productId: 'prod-5',
        productName: 'Blueberry Muffin',
        quantity: 2,
        unitPrice: 3.5,
      },
      {
        id: 'item-6',
        productId: 'prod-6',
        productName: 'Water Bottle',
        quantity: 1,
        unitPrice: 1.5,
      },
    ],
  },
]
