import { MOCK_ROLES } from '../data/mock-roles'
import { RolesTable } from './roles-table'

export default function RolesPage() {
  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <RolesTable data={MOCK_ROLES} />
    </div>
  )
}
