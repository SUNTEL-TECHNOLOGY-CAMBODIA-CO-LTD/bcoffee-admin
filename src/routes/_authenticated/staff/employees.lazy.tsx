import { createLazyFileRoute } from '@tanstack/react-router'
import EmployeesPage from '@/features/staff/pages/employees-page'

export const Route = createLazyFileRoute('/_authenticated/staff/employees')({
  component: EmployeesPage,
})
