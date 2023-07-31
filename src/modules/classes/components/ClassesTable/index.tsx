import { DataGrid } from '@mui/x-data-grid'

const ClassesTable = ({ columns, rows }) => {
  return (
    <div style={{ width: '100%', padding: '1rem 0' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        density='compact'
      />
    </div>
  )
}

export default ClassesTable
