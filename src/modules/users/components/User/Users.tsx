import { GridColDef, GridCellParams } from '@mui/x-data-grid'
import { useState, useEffect, useMemo, Dispatch, SetStateAction, useContext } from 'react'
import { Chip } from '@mui/material'
import styles from './Users.module.scss'
import { toggleUser, getUsers } from '../../services/user.service'
import { MouseEvent } from 'react'
import { AppContext } from '../../../../App'
import { AxiosError } from 'axios'
import { SnackInfo } from '../../../../App'
import UserTable from '../UserTable'

type UserTableEntry = {
  id: number
  Index: number
  first_name: string
  last_name: string
  contact_number: string
  role_name: string
  date_of_birth: string
  is_active: boolean
}

const columnsLst: GridColDef[] = [
  { field: 'Index', headerName: 'Index', width: 60 },
  { field: 'first_name', headerName: 'First name', width: 170 },
  { field: 'last_name', headerName: 'Last name', width: 170 },
  { field: 'email', headerName: 'Email', width: 170 },
  { field: 'contact_number', headerName: 'Contact number', type: 'number', width: 160 },
  { field: 'role_name', headerName: 'Role', width: 100 },
  { field: 'date_of_birth', headerName: 'Date of birth', width: 170, editable: true },
]

const handleToggle = async (
  event: MouseEvent,
  params: GridCellParams,
  rows: UserTableEntry[],
  setRows: Dispatch<SetStateAction<UserTableEntry[]>>,
  setSnack: Dispatch<SetStateAction<SnackInfo>>
) => {
  event.stopPropagation()
  event.preventDefault()
  const { row } = params
  try {
    await toggleUser(row.id, { is_active: !row.is_active })
    const newUsers = rows.map((item) => {
      if (item.id == row.id) return { ...item, is_active: !item.is_active }
      return item
    })
    setRows(newUsers)
  } catch (error: AxiosError | any) {
    setSnack({
      open: true,
      type: 'error',
      message: error.response.data.message,
    } as SnackInfo)
  }
}

export default function Users() {
  const [rows, setRows] = useState<UserTableEntry[]>([])
  const { setSnack } = useContext(AppContext)

  useEffect(() => {
    const xz = async () => {
      try {
        const { data } = await getUsers()
        const modifiedRows = data.map((row: any, index: number) => {
          return {
            ...row,
            date_of_birth: row.date_of_birth.substring(0, 10),
            Index: index + 1,
          }
        })
        setRows(modifiedRows)
      } catch (error) {
        console.log(error)
      }
    }
    xz()
  }, [])

  const columns = useMemo(() => {
    return [
      ...columnsLst,
      {
        field: 'is_active',
        headerName: 'Status',
        width: 100,
        renderCell: (params: GridCellParams | any) => (
          <Chip
            className={styles[params.value ? 'cpActive' : 'cpFalse']}
            label={params.value ? 'Active' : 'Inactive'}
            size='small'
            onClick={(event) => handleToggle(event, params, rows, setRows, setSnack)}
          />
        ),
      },
    ]
  }, [rows])

  return (
    <>
      <h1>Users</h1>
      <div style={{ width: '100%', padding: '1rem 0' }}>
        <UserTable
          columns={columns}
          rows={rows}
          height={200}
        />
      </div>
    </>
  )
}
