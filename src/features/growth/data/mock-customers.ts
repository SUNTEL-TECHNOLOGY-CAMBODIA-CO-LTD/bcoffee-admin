import { type Customer } from '@/types/growth'

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust_1',
    fullName: 'Alice Johnson',
    phone: '+15550101',
    status: 'ACTIVE',
    createdAt: '2024-11-15',
  },
  {
    id: 'cust_2',
    fullName: 'Bob Smith',
    phone: '+15550102',
    status: 'ACTIVE',
    createdAt: '2024-12-01',
  },
  {
    id: 'cust_3',
    fullName: 'Charlie Davis',
    phone: '+15550103',
    status: 'PENDING',
    createdAt: '2024-12-20',
  },
  {
    id: 'cust_4',
    fullName: 'Diana Evans',
    phone: '+15550104',
    status: 'BANNED',
    createdAt: '2024-10-05',
  },
  {
    id: 'cust_5',
    fullName: 'Ethan Harris',
    phone: '+15550105',
    status: 'ACTIVE',
    createdAt: '2025-01-02',
  },
]
