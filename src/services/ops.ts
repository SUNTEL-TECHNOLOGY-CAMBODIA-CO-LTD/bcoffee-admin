import {
  type Order,
  type GetOrdersFilters,
  type UpdateOrderStatusRequest,
  type InventoryItem,
  type AdjustStockRequest,
  type PaginationMeta,
} from '@/types/api'
import { apiClient } from '@/lib/api-client'

// Orders
export const getOrders = async (
  filters?: GetOrdersFilters
): Promise<{ data: Order[]; meta: PaginationMeta }> => {
  const response = await apiClient.get('/admin/orders', { params: filters })
  return response.data // Assuming paginated response structure
}

export const updateOrderStatus = async (
  id: string,
  data: UpdateOrderStatusRequest
): Promise<Order> => {
  const response = await apiClient.patch(`/admin/orders/${id}`, data)
  return response.data
}

// Inventory
// Note: Endpoint paths inferred as they were missing from the provided spec snippet for shop-specific inventory.
export const getInventory = async (
  shopId: string
): Promise<InventoryItem[]> => {
  const response = await apiClient.get(`/admin/shops/${shopId}/inventory`)
  return response.data
}

export const adjustStock = async (data: AdjustStockRequest): Promise<void> => {
  const response = await apiClient.post('/admin/inventory/adjust', data)
  return response.data
}
