import { DataGrid, GridColDef, GridValueGetterParams,GridCellParams  } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { getUsers } from './server'


import { Chip } from '@mui/material';

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
    renderCell: (params: GridCellParams) => (
        <Chip label="Clickable"  onClick={(event) => handleClick(event, params.value)} />
      ),
  },
]
const handleClick = (event: React.MouseEvent<HTMLDivElement>, value: any) => {
    event.stopPropagation();
    // Действия при клике на Chip
  };
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
