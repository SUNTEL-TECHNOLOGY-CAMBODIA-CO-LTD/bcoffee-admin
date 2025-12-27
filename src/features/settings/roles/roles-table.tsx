import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/custom/data-table'
import { type Role } from '../data/role-schema'
import { RoleSheet } from './role-sheet'
import { columns } from './roles-columns'

interface RolesTableProps {
  data: Role[]
}

export function RolesTable({ data: initialData }: RolesTableProps) {
  const [data, setData] = useState<Role[]>(initialData)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const handleCreate = () => {
    setEditingRole(null)
    setIsSheetOpen(true)
  }

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setIsSheetOpen(true)
  }

  const handleDelete = (role: Role) => {
    if (confirm(`Are you sure you want to delete ${role.name}?`)) {
      setData((prev) => prev.filter((r) => r.id !== role.id))
    }
  }

  const handleSave = (role: Role) => {
    if (editingRole) {
      // Update
      setData((prev) => prev.map((r) => (r.id === role.id ? role : r)))
    } else {
      // Create
      setData((prev) => [...prev, role])
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Roles & Permissions
          </h2>
          <p className='text-muted-foreground'>
            Manage access levels and permissions for your team.
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Button onClick={handleCreate}>
            <Plus className='mr-2 h-4 w-4' />
            Create Role
          </Button>
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        searchKey='name'
        meta={{
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

      <RoleSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        role={editingRole}
        onSave={handleSave}
      />
    </div>
  )
}
