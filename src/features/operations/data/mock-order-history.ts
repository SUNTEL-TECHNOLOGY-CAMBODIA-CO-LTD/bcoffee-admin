import { subDays, subHours } from 'date-fns'
import { type Order } from '@/types/orders'

const now = new Date()

export const MOCK_ORDER_HISTORY: Order[] = [
  // 1. Completed Historic Order
  {
    id: 'hist_101',
    shopId: 'shop_01',
    invoiceCode: 'INV-0101',
    queueNumber: '#101',
    type: 'DINE_IN',
    status: 'COMPLETED',
    customerName: 'Alice Johnson',
    createdAt: subHours(now, 26).toISOString(), // Yesterday
    updatedAt: subHours(now, 25).toISOString(),

    subTotal: 18.0,
    discountTotal: 0,
    surchargeTotal: 1.8, // 10% tax/service
    grandTotal: 19.8,

    paymentMethodName: 'Visa **** 1234',
    paymentStatus: 'SUCCESS',
    surcharges: [{ name: 'Service Charge', amount: 1.8 }],

    items: [
      { id: 'i1', name: 'Truffle Pasta', quantity: 1, price: 12.0 },
      { id: 'i2', name: 'Iced Latte', quantity: 1, price: 6.0 },
    ],
  },

  // 2. Discounted Order
  {
    id: 'hist_102',
    shopId: 'shop_01',
    invoiceCode: 'INV-0102',
    queueNumber: '#102',
    type: 'TAKEAWAY',
    status: 'COMPLETED',
    customerName: 'Bob Smith',
    createdAt: subHours(now, 5).toISOString(), // Today
    updatedAt: subHours(now, 4).toISOString(),

    subTotal: 10.0,
    discountTotal: 2.0,
    surchargeTotal: 0,
    grandTotal: 8.0,

    paymentMethodName: 'Cash',
    paymentStatus: 'SUCCESS',
    discounts: [{ name: 'Promo: COFFEE2OFF', amount: 2.0 }],

    items: [{ id: 'i3', name: 'Caramel Macchiato', quantity: 2, price: 5.0 }],
  },

  // 3. Cancelled Order
  {
    id: 'hist_103',
    shopId: 'shop_01',
    invoiceCode: 'INV-0103',
    queueNumber: '#103',
    type: 'DELIVERY',
    status: 'CANCELLED',
    customerName: 'Charlie',
    createdAt: subDays(now, 2).toISOString(),
    updatedAt: subDays(now, 2).toISOString(),

    subTotal: 45.0,
    discountTotal: 0,
    surchargeTotal: 5.0, // Delivery Fee
    grandTotal: 50.0,

    paymentMethodName: 'Online Payment',
    paymentStatus: 'REFUNDED',
    surcharges: [{ name: 'Delivery Fee', amount: 5.0 }],

    items: [{ id: 'i4', name: 'Party Platter', quantity: 1, price: 45.0 }],
  },

  // 4. Order with Modifiers
  {
    id: 'hist_104',
    shopId: 'shop_01',
    invoiceCode: 'INV-0104',
    queueNumber: '#104',
    type: 'TAKEAWAY',
    status: 'READY', // Currently active
    customerName: 'Dave',
    createdAt: subMinutes(now, 10).toISOString(),
    updatedAt: subMinutes(now, 10).toISOString(),

    subTotal: 6.5,
    discountTotal: 0,
    surchargeTotal: 0,
    grandTotal: 6.5,

    paymentMethodName: 'Wallet',
    paymentStatus: 'SUCCESS',

    items: [
      {
        id: 'i5',
        name: 'Latte',
        quantity: 1,
        price: 5.5,
        variant: 'Large',
        options: [
          { name: 'Milk', choice: 'Oat Milk' },
          { name: 'Sugar', choice: 'No Sugar' },
        ],
      },
    ],
  },
]

function subMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() - minutes * 60000)
}
