import { createFileRoute } from '@tanstack/react-router'
import { Login2 } from '@/features/auth/login/login-2'

export const Route = createFileRoute('/(auth)/login-2')({
  component: Login2,
})
