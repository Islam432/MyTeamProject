import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { UserTableEntry } from '../../models/User.model'
import { memo } from 'react'

type UserTableProps = {
  columns: GridColDef[]
  rows: UserTableEntry[]
}

const UserTable = memo(function ({ columns, rows }: UserTableProps) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode='row'
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 25 },
        },
      }}
      pageSizeOptions={[10, 25, 50]}
      checkboxSelection
      density='compact'
    />
  )
})

export default UserTable
