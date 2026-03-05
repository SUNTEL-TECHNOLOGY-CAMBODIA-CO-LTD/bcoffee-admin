import { type Recipe, type CreateRecipeDto } from '@/types/api'
import { apiClient } from '@/lib/api-client'

export const getRecipes = async (productId: string): Promise<Recipe[]> => {
  const response = await apiClient.get(`/admin/recipes`, {
    params: { productId },
  })
  return response.data
}

export const createRecipe = async (data: CreateRecipeDto): Promise<Recipe> => {
  const response = await apiClient.post('/admin/recipes', data)
  return response.data
}

export const updateRecipe = async (
  id: string,
  data: Partial<CreateRecipeDto>
): Promise<Recipe> => {
  const response = await apiClient.patch(`/admin/recipes/${id}`, data)
  return response.data
}

export const deleteRecipe = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/recipes/${id}`)
}
