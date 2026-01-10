import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

export const useUploadProductImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiClient.post(
        '/admin/media/upload/product',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    },
  })
}
