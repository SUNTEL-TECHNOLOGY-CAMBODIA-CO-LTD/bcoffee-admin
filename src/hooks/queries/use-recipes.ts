import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getRecipesByOptionId,
  createRecipe,
  deleteRecipe,
} from '@/services/inventory'
import { type CreateRecipeDto } from '@/types/inventory'

export const useGetOptionRecipes = (optionId: string | null) => {
  return useQuery({
    queryKey: ['recipes', 'option', optionId],
    queryFn: () => getRecipesByOptionId(optionId!),
    enabled: !!optionId,
  })
}

export const useCreateRecipe = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateRecipeDto) => createRecipe(data),
    onSuccess: (_, variables) => {
      if (variables.optionId) {
        queryClient.invalidateQueries({
          queryKey: ['recipes', 'option', variables.optionId],
        })
      }
      if (variables.productId) {
        queryClient.invalidateQueries({
          queryKey: ['recipes', 'product', variables.productId],
        })
      }
    },
  })
}

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: () => {
      // Invalidate all recipe queries to be safe, or we could optimistically update if we knew the parent
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
    },
  })
}
