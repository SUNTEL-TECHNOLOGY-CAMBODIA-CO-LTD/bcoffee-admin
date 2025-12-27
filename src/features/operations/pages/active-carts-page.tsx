import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { ActiveCartsTable } from '../components/active-carts-table'
import { CartDetailSheet } from '../components/cart-detail-sheet'
import { type Cart } from '../data/cart-schema'
import { MOCK_CARTS } from '../data/mock-carts'

export function ActiveCartsPage() {
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleViewDetails = (cart: Cart) => {
    setSelectedCart(cart)
    setIsSheetOpen(true)
  }

  return (
    <div className='flex h-full flex-col space-y-6 p-8'>
      <PageTitle
        title='Active Carts'
        subtitle='Monitor customer carts in real-time. View items and potential order value.'
      />

      <ActiveCartsTable data={MOCK_CARTS} onViewDetails={handleViewDetails} />

      <CartDetailSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        cart={selectedCart}
      />
    </div>
  )
}
