import { DataGrid } from '@mui/x-data-grid'
// import styles from '../User/Users.module.scss'

const UserTable = ({ columns, rows, height }) => {
  return (
    <DataGrid
      sx={{
        minHeight: `${height}px`,
      }}
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
}

export default UserTable
