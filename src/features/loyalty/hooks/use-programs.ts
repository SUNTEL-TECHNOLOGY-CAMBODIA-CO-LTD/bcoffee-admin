import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProgram, getPrograms, updateProgram, deleteProgram } from '@/services/loyalty'

export const usePrograms = (params?: {
  page?: number
  limit?: number
  businessId?: string
}) => {
  return useQuery({
    queryKey: ['loyalty-programs', params],
    queryFn: () => getPrograms(params),
  })
}

export const useProgram = (id: string) => {
  return useQuery({
    queryKey: ['loyalty-program', id],
    queryFn: () => getProgram(id),
    enabled: !!id,
  })
}

export const useUpdateProgram = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loyalty-programs'] })
      queryClient.invalidateQueries({ queryKey: ['loyalty-program'] })
    },
  })
}

export const useDeleteProgram = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loyalty-programs'] })
    },
  })
}
