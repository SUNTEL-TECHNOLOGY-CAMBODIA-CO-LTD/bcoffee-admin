export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'COMPLETED'
  | 'CANCELLED'

export type OrderType = 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'

export interface OrderItemOption {
  name: string
  choice: string
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number // Unit price
  variant?: string
  options?: OrderItemOption[]
  notes?: string
}

export interface OrderDiscount {
  name: string
  amount: number
}

export interface OrderSurcharge {
  name: string
  amount: number
}

export interface Order {
  id: string
  shopId: string
  invoiceCode: string
  queueNumber: string
  type: OrderType
  status: OrderStatus

  items: OrderItem[]

  // Financials
  subTotal: number
  discountTotal: number
  surchargeTotal: number // Tax etc
  grandTotal: number

  discounts?: OrderDiscount[]
  surcharges?: OrderSurcharge[]

  // Payment
  paymentMethodName: string
  paymentStatus: PaymentStatus

  createdAt: string // ISO string
  updatedAt: string // ISO string
  customerName?: string
}
