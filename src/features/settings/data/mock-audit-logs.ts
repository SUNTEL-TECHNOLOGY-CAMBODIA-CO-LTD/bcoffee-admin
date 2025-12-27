import { subHours, subMinutes } from 'date-fns'
import { type AuditLog } from './audit-log-schema'

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    createdAt: subMinutes(new Date(), 15),
    actorStaffId: 'staff-1',
    actorName: 'John Barista',
    actionType: 'UPDATE',
    targetResource: 'Latte',
    shopCode: 'SHOP-01',
    details: {
      field: 'price',
      oldValue: 4.5,
      newValue: 5.0,
    },
  },
  {
    id: 'log-2',
    createdAt: subHours(new Date(), 2),
    actorStaffId: 'staff-2',
    actorName: 'Jane Cashier',
    actionType: 'REFUND',
    targetResource: 'Refund #999',
    shopCode: 'SHOP-02',
    authorizedByStaffId: 'staff-3',
    authorizedByName: 'Sarah Manager',
    details: {
      amount: 12.5,
      reason: 'Customer complaint - cold coffee',
      orderId: 'ORD-12345',
    },
  },
  {
    id: 'log-3',
    createdAt: subHours(new Date(), 5),
    actorStaffId: 'staff-3',
    actorName: 'Sarah Manager',
    actionType: 'DELETE',
    targetResource: 'Croissant',
    shopCode: 'HQ',
    details: {
      id: 'prod-croissant',
      name: 'Croissant',
      category: 'Pastry',
    },
  },
  {
    id: 'log-4',
    createdAt: subHours(new Date(), 24),
    actorStaffId: 'staff-1',
    actorName: 'John Barista',
    actionType: 'CREATE',
    targetResource: 'Seasonal Muffin',
    shopCode: 'SHOP-01',
    details: {
      name: 'Seasonal Muffin',
      price: 3.5,
      sku: 'MUFF-SEAS',
    },
  },
]
