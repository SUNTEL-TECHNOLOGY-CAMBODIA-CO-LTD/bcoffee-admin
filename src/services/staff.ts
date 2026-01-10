import {
  type Staff,
  type CreateStaffRequest,
  type AssignShopAccessRequest,
} from '@/types/api'
import { apiClient } from '@/lib/api-client'

export const getStaff = async (): Promise<Staff[]> => {
  const response = await apiClient.get('/admin/staff')
  return response.data
}

export const createStaff = async (data: CreateStaffRequest): Promise<Staff> => {
  const response = await apiClient.post('/admin/staff', data)
  return response.data
}

export const assignShop = async (
  staffId: string,
  data: AssignShopAccessRequest
): Promise<void> => {
  await apiClient.post(`/admin/staff/${staffId}/shop-access`, data)
}
