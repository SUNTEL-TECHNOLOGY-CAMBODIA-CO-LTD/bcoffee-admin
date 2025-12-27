import { type Permission, type Role } from './role-schema'

export const MOCK_PERMISSIONS: Permission[] = [
  // Dashboard
  { id: 'dashboard.view', label: 'View Dashboard', group: 'Dashboard' },
  {
    id: 'dashboard.view_revenue',
    label: 'View Revenue',
    group: 'Dashboard',
    description: 'Can see sensitive financial data',
  },

  // POS
  { id: 'pos.access', label: 'Access POS', group: 'POS' },
  { id: 'pos.open_register', label: 'Open/Close Register', group: 'POS' },
  {
    id: 'pos.refund',
    label: 'Process Refunds',
    group: 'POS',
    description: 'Can refund orders',
  },
  { id: 'pos.discount', label: 'Apply Discounts', group: 'POS' },
  { id: 'pos.void', label: 'Void Orders', group: 'POS' },

  // Inventory
  { id: 'inventory.view', label: 'View Inventory', group: 'Inventory' },
  { id: 'inventory.adjust', label: 'Adjust Stock', group: 'Inventory' },
  {
    id: 'inventory.manage_suppliers',
    label: 'Manage Suppliers',
    group: 'Inventory',
  },

  // Menu // Products
  { id: 'menu.manage', label: 'Manage Products', group: 'Menu' },
  { id: 'menu.manage_categories', label: 'Manage Categories', group: 'Menu' },
  { id: 'menu.manage_prices', label: 'Manage Prices', group: 'Menu' },

  // Staff
  { id: 'staff.view', label: 'View Staff', group: 'Staff' },
  { id: 'staff.manage', label: 'Manage Staff', group: 'Staff' },
  { id: 'staff.manage_roster', label: 'Manage Roster', group: 'Staff' },

  // Customers (Growth)
  { id: 'customers.view', label: 'View Customers', group: 'Growth' },
  { id: 'marketing.manage', label: 'Manage Marketing', group: 'Growth' },

  // Settings
  { id: 'settings.view', label: 'View Settings', group: 'Settings' },
  {
    id: 'settings.manage_store',
    label: 'Manage Store Settings',
    group: 'Settings',
  },
]

export const MOCK_ROLES: Role[] = [
  {
    id: 'role_admin',
    name: 'Administrator',
    slug: 'admin',
    description: 'Full access to all features.',
    permissions: MOCK_PERMISSIONS.map((p) => p.id),
    usersCount: 2,
  },
  {
    id: 'role_manager',
    name: 'Store Manager',
    slug: 'store_manager',
    description: 'Can manage store operations, staff, and inventory.',
    permissions: [
      'dashboard.view',
      'dashboard.view_revenue',
      'pos.access',
      'pos.open_register',
      'pos.refund',
      'pos.discount',
      'pos.void',
      'inventory.view',
      'inventory.adjust',
      'inventory.manage_suppliers',
      'menu.manage',
      'staff.view',
      'staff.manage_roster',
      'customers.view',
    ],
    usersCount: 5,
  },
  {
    id: 'role_barista',
    name: 'Barista',
    slug: 'barista',
    description: 'Standard access for day-to-day operations.',
    permissions: ['pos.access', 'inventory.view'],
    usersCount: 12,
  },
  {
    id: 'role_cashier',
    name: 'Cashier',
    slug: 'cashier',
    description: 'Focus on payments and orders.',
    permissions: ['pos.access', 'pos.discount'],
    usersCount: 3,
  },
]
