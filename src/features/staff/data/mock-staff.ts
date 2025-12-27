import { type Staff, type Role, type StaffShift } from '@/types/staff'

export const MOCK_ROLES: Role[] = [
  {
    id: 'role_manager',
    name: { en: 'Store Manager' },
    slug: 'store-manager',
    description: { en: 'Full access to store operations and settings.' },
  },
  {
    id: 'role_barista',
    name: { en: 'Barista' },
    slug: 'barista',
    description: { en: 'Can process orders and manage inventory.' },
  },
  {
    id: 'role_cashier',
    name: { en: 'Cashier' },
    slug: 'cashier',
    description: { en: 'Can process payments only.' },
  },
]

export const MOCK_STAFF: Staff[] = [
  {
    id: 'staff_alice',
    username: 'alice',
    fullName: 'Alice Manager',
    phone: '+15550101',
    status: 'ACTIVE',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    access: [
      {
        staffId: 'staff_alice',
        shopId: 'shop_01',
        roleId: 'role_manager',
        role: MOCK_ROLES[0],
      },
      {
        staffId: 'staff_alice',
        shopId: 'shop_02',
        roleId: 'role_manager',
        role: MOCK_ROLES[0],
      },
    ],
  },
  {
    id: 'staff_john',
    username: 'johndoe',
    fullName: 'John Doe',
    phone: '+15550102',
    status: 'ACTIVE',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    access: [
      {
        staffId: 'staff_john',
        shopId: 'shop_01',
        roleId: 'role_barista',
        role: MOCK_ROLES[1],
      },
    ],
  },
  {
    id: 'staff_jane',
    username: 'janesmith',
    fullName: 'Jane Smith',
    phone: '+15550103',
    status: 'ACTIVE',
    profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    access: [
      {
        staffId: 'staff_jane',
        shopId: 'shop_02',
        roleId: 'role_cashier',
        role: MOCK_ROLES[2],
      },
    ],
  },
]

export const MOCK_SHIFTS: StaffShift[] = [
  {
    id: 'shift_01',
    staffId: 'staff_john',
    shopId: 'shop_01',
    date: '2025-12-25',
    startTime: '07:00',
    endTime: '15:00',
  },
  {
    id: 'shift_02',
    staffId: 'staff_alice',
    shopId: 'shop_01',
    date: '2025-12-25',
    startTime: '09:00',
    endTime: '17:00',
    roleId: 'role_manager',
  },
]
