import { memo } from 'react'
import { GridCellParams, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { Chip } from '@mui/material'
import { AxiosError } from 'axios'
import { MouseEvent } from 'react'
import { getClasses, toggleEnrollment } from '../../../../shared/services/class.service'
import { AppContext } from './../../../../App'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import styles from './Classes.module.scss'
import { Link } from 'react-router-dom'
import ClassTable from '../ClassTable/ClassTable'
import { ClassTableEntry } from '../../models/Class.model'

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
  rows: ClassTableEntry[],
  setRows: Dispatch<SetStateAction<ClassTableEntry[]>>,
  openErrorMessage: (message: string) => void,
  openSuccessMessage: (message: string) => void
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
    openSuccessMessage(data.message)
  } catch (error) {
    if (error instanceof AxiosError) {
      openErrorMessage(error.response?.data.message)
    }
  }
}

const Classes = memo(function () {
  const [rows, setRows] = useState<ClassTableEntry[]>([])
  const { openErrorMessage, openSuccessMessage } = useContext(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getClasses<ClassTableEntry[]>()
        const modifiedRows = data.map((row: ClassTableEntry, indx: number) => {
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
              onClick={(event) => handleToggle(event, params, rows, setRows, openErrorMessage, openSuccessMessage)}
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
  }, [rows, openErrorMessage, openSuccessMessage])

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1>Classes</h1>
      <ClassTable
        columns={columns}
        rows={rows}
      />
    </div>
  )
})

export default Classes
