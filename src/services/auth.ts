import {
  type StaffLoginResponse,
  type ChangePasswordRequest,
} from '@/types/api'
import { apiClient } from '@/lib/api-client'

export interface StaffLoginDto {
  username: string
  password: string
}

export const login = async (
  data: StaffLoginDto
): Promise<StaffLoginResponse> => {
  const response = await apiClient.post('/admin/auth/login', data)
  return response.data
}

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<void> => {
  await apiClient.post('/admin/auth/change-password', data)
}
