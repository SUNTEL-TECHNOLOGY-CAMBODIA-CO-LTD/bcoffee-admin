import { createLazyFileRoute } from '@tanstack/react-router'
import EmployeesPage from '@/features/staff/employees/index'

export const Route = createLazyFileRoute('/_authenticated/staff/employees')({
  component: EmployeesPage,
})
