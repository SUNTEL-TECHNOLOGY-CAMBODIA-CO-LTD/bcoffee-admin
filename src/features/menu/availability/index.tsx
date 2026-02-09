import { useState, useMemo } from 'react'
import { MOCK_SHOPS } from '@/stores/shop-store'
import { PageTitle } from '@/components/page-title'
import { type AvailabilityTableRow } from '../_components/availability/availability-columns'
import { AvailabilitySheet } from '../_components/availability/availability-sheet'
import { AvailabilityTable } from '../_components/availability/availability-table'
import { MOCK_PRODUCT_AVAILABILITY } from '../data/mock-availability'
import { MOCK_PRODUCTS } from '../data/mock-products'
import { type Product } from '../data/schema'

export default function AvailabilityPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  // 1. Transform Data
  const tableData: AvailabilityTableRow[] = useMemo(() => {
    return MOCK_PRODUCTS.map((product) => {
      // Count active availability
      const activeCount = MOCK_PRODUCT_AVAILABILITY.filter(
        (a) => a.productId === product.id && a.isAvailable
      ).length

      return {
        ...product,
        activeShopsCount: activeCount,
        totalShopsCount: MOCK_SHOPS.length,
      }
    })
  }, []) // Ops: Depend on real data in production

  // 2. Handlers
  const handleManage = (item: AvailabilityTableRow) => {
    setSelectedProduct(item as Product) // Safe cast as it extends
    setSheetOpen(true)
  }

  const handleBulkPublish = (ids: string[]) => {
    const confirm = window.confirm(
      `Publish ${ids.length} products to all ${MOCK_SHOPS.length} shops?`
    )
    if (confirm) {
      alert('Bulk publish initiated.')
    }
  }

  return (
    <div className='space-y-6 p-6'>
      <PageTitle
        title='Availability Matrix'
        subtitle='Control product visibility and pricing across all locations.'
      />

      <AvailabilityTable
        data={tableData}
        onManage={handleManage}
        onBulkPublish={handleBulkPublish}
      />

      <AvailabilitySheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        product={selectedProduct}
        initialAvailability={MOCK_PRODUCT_AVAILABILITY}
      />
    </div>
  )
}
