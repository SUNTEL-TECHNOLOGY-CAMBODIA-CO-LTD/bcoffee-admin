import { Navigate } from '@tanstack/react-router'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}
