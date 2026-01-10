import { type AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { login, type StaffLoginDto } from '@/services/auth'
import { toast } from 'sonner'

// Assuming tanstack router based on 'routeTree.gen.ts' in file list
// If it's react-router-dom, I should check.
// Step 3 list_dir showed `routeTree.gen.ts`, which is typical for TanStack Router.
// Also `main.tsx` size suggests modern stack.
// Actually, I'll fallback to `window.location.href` or just not include navigation inside the hook if I am unsure,
// but the task says: "useLogin(): On success -> Save token to localStorage, redirect to Dashboard."
// I will implement the logic.

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: StaffLoginDto) => login(data),
    onSuccess: (data) => {
      // Save tokens and user details
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('currentUser', JSON.stringify(data.user))

      toast.success('Welcome back!', {
        description: `Logged in as ${data.user.username}`,
      })

      // Redirect to dashboard
      window.location.href = '/'
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error('Login Failed', {
        description:
          error.response?.data?.message || 'Invalid username or password',
      })
    },
  })
}
