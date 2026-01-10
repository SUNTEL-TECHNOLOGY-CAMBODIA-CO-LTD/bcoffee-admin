import {
  type BusinessProfile,
  type UpdateBusinessProfileRequest,
} from '@/types/api'
import { apiClient } from '@/lib/api-client'

export const getBusinessProfile = async (): Promise<BusinessProfile> => {
  const response = await apiClient.get('/admin/business')
  return response.data
}

export const updateBusinessProfile = async (
  data: UpdateBusinessProfileRequest
): Promise<BusinessProfile> => {
  const response = await apiClient.patch('/admin/business', data)
  return response.data
}
