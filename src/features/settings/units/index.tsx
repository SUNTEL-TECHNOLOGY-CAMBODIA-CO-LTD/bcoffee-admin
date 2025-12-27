import { DataTable } from '@/components/custom/data-table'
import { PageTitle } from '@/components/page-title'
import { MOCK_UNITS } from '../data/mock-settings'
import { columns } from './components/units-columns'

export default function UnitsSettingsPage() {
  return (
    <div className='p-6'>
      <PageTitle title='Units of Measure' />

      <DataTable
        columns={columns}
        data={MOCK_UNITS}
        searchKey='name'
        searchPlaceholder='Filter units...'
      />
    </div>
  )
}
