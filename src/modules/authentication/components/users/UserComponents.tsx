import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { getUsers } from './server'
import { any, number } from 'zod'
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'first_name', headerName: 'First name', width: 170 },
  { field: 'last_name', headerName: 'Last name', width: 170 },
  {
    field: 'email',
    headerName: 'Email',
    width: 170,
  },
  {
    field: 'contact_number',
    headerName: 'Contact_number',
    type: 'number',
    width: 160,
},
{
  field: 'role_name',
  headerName: 'Role',
  width: 130,
},
  {
    field: 'date_of_birth',
    headerName: 'date_of_birth ',
    width: 170,
  },
  {
    field: 'is_active',
    headerName: 'Status ',
    width: 170,
  },
]

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ]

export default function UserComponents() {
  const [rows, setRows] = useState<any[]>([])
  useEffect(() => {
    const xz = async () => {
      try {
        const resp: any = await getUsers()
        console.log(resp.data)
        const modifiedRows = resp.data.map((row: any) => {
          return {
            ...row,
            date_of_birth: row.date_of_birth.substring(0, 10),
          }
        })
        setRows(modifiedRows)
      } catch (error) {
        console.log(error)
      }
    }

    xz()
  }, [])

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
