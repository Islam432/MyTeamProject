import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { Chip } from '@mui/material'
import Snack from '../../../../shared/components/Snackbar/Snackbar'
import styles from './User.module.scss'
import { toggleUser, getUsers } from '../../services/user.service'

export default function User() {
  const [open, setOpen] = useState<boolean>(false)
  const [rows, setRows] = useState<any[]>([])

  const columns: GridColDef[] = [
    { field: 'Index', headerName: 'ID', width: 60 },
    { field: 'first_name', headerName: 'First name', width: 170 },
    { field: 'last_name', headerName: 'Last name', width: 170 },
    {
      field: 'email',
      headerName: 'Email',
      width: 170,
    },
    {
      field: 'contact_number',
      headerName: 'Contact number',
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
      headerName: 'Date of birth',
      width: 170,
    },
    {
      field: 'is_active',
      headerName: 'Status ',
      width: 130,
      renderCell: (params: GridCellParams | any) => (
        <Chip
          className={styles[params.value ? 'cpFalse' : 'cpActive']}
          label={params.value ? 'Inactive' : 'Active'}
          size='small'
          onClick={(event) => handleClick(event, params.value, params.id)}
        />
      ),
    },
  ]
  const handleClick = async (event: React.MouseEvent<HTMLDivElement>, value: boolean, id: any) => {
    event.stopPropagation()

    try {
      await toggleUser({ is_active: value, id })
      setRows(
        rows.map((item) => {
          if (item.id == id) return { ...item, is_active: !item.is_active }
          return item
        })
      )
      setOpen(false)
    } catch (error) {
      console.log(error)
      setOpen(true)
    }
  }

  useEffect(() => {
    const xz = async () => {
      try {
        const resp: any = await getUsers()
        console.log(resp.data)
        const modifiedRows = resp.data.map((row: any, index: number) => {
          return {
            ...row,
            date_of_birth: row.date_of_birth.substring(0, 10),
            Index: (index + 1).toString(),
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
    <div style={{ width: '100%' }}>
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
        density='compact'
      />
      <Snack open={open}>message</Snack>
    </div>
  )
}
