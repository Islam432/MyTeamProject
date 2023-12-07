import { GridColDef, GridCellParams } from '@mui/x-data-grid'
import { useState, useEffect, useMemo, Dispatch, SetStateAction, useContext } from 'react'
import { Button, Chip } from '@mui/material'
import styles from './Users.module.scss'
import { toggleUser, getUsers } from '../../../../shared/services/user.service'
import { MouseEvent } from 'react'
import { AppContext } from '../../../../App'
import UserTable from '../UserTable/UserTable'
import { AxiosError } from 'axios'
import Modal from '../../../../shared/components/Modal/Modal'
import { UserSchema } from '../../../../shared/schemas/user.schema'
import { z } from 'zod'
import UsersRegForm from './UsersRegForm'
import { UserTableEntry } from '../../models/User.model'

export type FormData = z.infer<typeof UserSchema>

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
  openErrorMessage: (message: string) => void
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
  } catch (error) {
    if (error instanceof AxiosError) {
      openErrorMessage(error.response?.data.message)
    }
  }
}

export default function Users() {
  const [rows, setRows] = useState<UserTableEntry[]>([])
  const { openErrorMessage } = useContext(AppContext)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const xz = async () => {
      try {
        const { data } = await getUsers<UserTableEntry[]>()
        const modifiedRows = data.map((row: UserTableEntry, index: number) => {
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
        renderCell: (params: GridCellParams) => (
          <Chip
            className={styles[params.value ? 'cpActive' : 'cpFalse']}
            label={params.value ? 'Active' : 'Inactive'}
            size='small'
            onClick={(event) => handleToggle(event, params, rows, setRows, openErrorMessage)}
          />
        ),
      },
    ]
  }, [rows, openErrorMessage])

  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <div className={styles.users}>
        <h1>Users</h1>
        <Button
          variant='contained'
          color='primary'
          className={styles.users__addbtn}
          onClick={() => {
            setOpen(!open)
          }}
        >
          Добавить пользователя
        </Button>
        <Modal
          title='Добавить нового пользователя'
          desc=''
          isOpen={open}
          onClose={handleCloseModal}
          btn={''}
        >
          <UsersRegForm />
        </Modal>
      </div>
      <div style={{ width: '100%', padding: '1rem 0' }}>
        <UserTable
          columns={columns}
          rows={rows}

        />
      </div>
    </>
  )
}
