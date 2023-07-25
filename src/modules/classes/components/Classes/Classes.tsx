import { memo } from 'react'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { Chip } from '@mui/material'
import { AxiosError } from 'axios'
import { MouseEvent } from 'react'
import { getClasses, toggleEnrollment } from '../../services/class.service'
import { AppContext } from './../../../../App'
import styles from './Classes.module.scss'

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
    field: 'id',
    headerName: 'ID',
    width: 60,
  },
  {
    field: 'course_code',
    headerName: 'Code',
    width: 100,
  },
  {
    field: 'course_name',
    headerName: 'Name',
    width: 120,
  },
  {
    field: 'branch_name',
    headerName: 'Branch Office',
    width: 160,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
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
  setSnackbarMessage: Dispatch<SetStateAction<string>>
) => {
  event.stopPropagation()
  event.preventDefault()
  const { row } = params
  try {
    await toggleEnrollment(row.id, { open_for_enrollment: !row.open_for_enrollment })
    const newUsers = rows.map((item) => {
      if (item.id == row.id) return { ...item, open_for_enrollment: !item.open_for_enrollment }
      return item
    })
    setRows(newUsers)
  } catch (error: AxiosError | any) {
    setSnackbarMessage(error.response.data.message)
  }
}

export default memo(function Classes() {
  const [rows, setRows] = useState<ClassType[]>([])
  const { setSnackbarMessage } = useContext(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getClasses()
        const modifiedRows = data.map((row: any) => {
          return {
            ...row,
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
        renderCell: (params: GridCellParams | any) => (
          <Chip
            className={styles[params.value ? 'cpActive' : 'cpFalse']}
            label={params.value ? 'Open' : 'Closed'}
            size='small'
            onClick={(event) => handleToggle(event, params, rows, setRows, setSnackbarMessage)}
          />
        ),
      },
    ]
  }, [rows])

  return (
    <>
      <h1>Classes</h1>
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
    </>
  )
})
