import { DataGrid, GridCellParams, GridColDef, } from '@mui/x-data-grid'
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { getClasses, toggler } from '../class.service'
import { Chip } from '@mui/material'
import styles from './class.module.scss'
import { AxiosError } from 'axios'

import { MouseEvent } from 'react'
import { AppContext } from '../../../App'
type ClassType = {
  id: number,
  description: string,
  branch_name: string,
  course_code: string,  
  start_date: any,
  end_date: any,
  open_for_enrollment: boolean,
}

const columnsLst: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field:  'course_code',
    headerName: 'Name',
    width: 140,
  },
  
  {
    field:  'branch_name',
    headerName: 'Adress office',
    width: 170,
  },
  {
    field:  'description',
    headerName: 'Description',
    width: 200,
  },
 
  {
    field:  'start_date',
    headerName: 'Start Date',
    width: 170,
  },
  {
    field:  'end_date',
    headerName: 'End Date',
    width: 170,
  },

]

export default function DataGridDemo() {
  const [rowss, setRowss] = useState<ClassType[]>([]) 
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
        console.log(modifiedRows)
        setRowss(modifiedRows)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const handleToggle = async (
    event: MouseEvent,
    params: GridCellParams,
    rows:  ClassType[],
    setRows: Dispatch<SetStateAction< ClassType[]>>,
    setSnackbarMessage: Dispatch<SetStateAction<string>>
  ) => {
    event.stopPropagation()
    event.preventDefault()
    const { row } = params
    try {
      await toggler(row.id, {open_for_enrollment: !row.open_for_enrollment })
      const newUsers = rows.map((item) => {
        if (item.id == row.id) return { ...item, open_for_enrollment: !item.open_for_enrollment }
        return item
      })
      setRows(newUsers)
    } catch (error: AxiosError | any) {
      setSnackbarMessage(error.response.data.message)
    }
  }

  const columns = useMemo(() => {
    return [
      ...columnsLst,
      {
        field: 'open_for_enrollment',
        headerName: 'Status',
        width: 160,
        renderCell: (params: GridCellParams | any) => (
          <Chip
            className={styles[params.value ? 'cpActive' : 'cpFalse']}
            label={params.value ? 'Open' : 'Clouse'}
            size='small'
            onClick={(event) => handleToggle(event, params, rowss, setRowss, setSnackbarMessage)}
          />
        ),
      },
    ]
  }, [rowss])


  return (
    <>
      <h1>Classes</h1>
      <div style={{ width: '100%', padding: '1rem 0' }}>
        <DataGrid
          rows={rowss} // Заменили rows на rowss
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </>
  )
}
