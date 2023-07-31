import { memo } from 'react'
import { GridCellParams, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { Chip } from '@mui/material'
import { AxiosError } from 'axios'
import { MouseEvent } from 'react'
import { getClasses, toggleEnrollment } from '../../services/class.service'
import { AppContext, SnackInfo } from './../../../../App'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import styles from './Classes.module.scss'
import { Link } from 'react-router-dom'
import ClassesTable from '../ClassesTable'

type ClassType = {
  id: number
  description: string
  branch_name: string
  course_code: string
  start_date: any
  end_date: any
  open_for_enrollment: boolean
}

const columnsLst: GridColDef[] = [
  {
    field: 'index',
    headerName: 'Index',
    width: 60,
  },
  {
    field: 'course_code',
    headerName: 'Code',
    width: 100,
    renderCell: (params: GridRenderCellParams) => <Link to={`/classes/${params.id}`}>{params.value}</Link>,
  },
  {
    field: 'course_name',
    headerName: 'Name',
    width: 120,
  },
  {
    field: 'branch_name',
    headerName: 'Branch Office',
    width: 120,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 170,
  },
  {
    field: 'start_date',
    headerName: 'Start Date',
    width: 170,
  },
  {
    field: 'end_date',
    headerName: 'End Date',
    width: 170,
  },
]

const handleToggle = async (
  event: MouseEvent,
  params: GridCellParams,
  rows: ClassType[],
  setRows: Dispatch<SetStateAction<ClassType[]>>,
  setSnack: Dispatch<SetStateAction<SnackInfo>>
) => {
  event.stopPropagation()
  event.preventDefault()
  const { row } = params
  try {
    const { data } = await toggleEnrollment(row.id, { open_for_enrollment: !row.open_for_enrollment })
    const newUsers = rows.map((item) => {
      if (item.id == row.id) return { ...item, open_for_enrollment: !item.open_for_enrollment }
      return item
    })
    setRows(newUsers)
    setSnack({
      open: true,
      type: 'success',
      message: data.message,
    } as SnackInfo)
  } catch (error: AxiosError | any) {
    setSnack({
      open: true,
      type: 'error',
      message: error.response.data?.message,
    } as SnackInfo)
  }
}

export default memo(function Classes() {
  const [rows, setRows] = useState<ClassType[]>([])
  const { setSnack } = useContext(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getClasses()
        const modifiedRows = data.map((row: any, indx: number) => {
          return {
            ...row,
            index: indx + 1,
            start_date: row.start_date.substring(0, 10),
            end_date: row.end_date.substring(0, 10),
          }
        })
        setRows(modifiedRows)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const columns = useMemo(() => {
    return [
      ...columnsLst,
      {
        field: 'open_for_enrollment',
        headerName: 'Enrollment',
        width: 100,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <Chip
              className={styles[params.value ? 'cpActive' : 'cpFalse']}
              label={params.value ? 'Open' : 'Closed'}
              size='small'
              onClick={(event) => handleToggle(event, params, rows, setRows, setSnack)}
            />
          )
        },
      } as GridColDef,
      {
        field: 'action',
        headerName: 'Action',
        width: 100,
        type: 'actions',
        align: 'center',
        renderCell: () => (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
            <FaEdit
              color='#333'
              fontSize='1.5rem'
            />
            <MdDelete
              color='#333'
              fontSize='1.5rem'
            />
          </div>
        ),
      } as GridColDef,
    ]
  }, [rows])

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1>Classes</h1>
      <ClassesTable
        columns={columns}
        rows={rows}
      />
    </div>
  )
})
