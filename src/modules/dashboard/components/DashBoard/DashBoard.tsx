import { useContext, useEffect, useState } from 'react'
import CardDash from '../CardDash/CardDash'
import styles from './Dashboard.module.scss'
import { PiStudentFill } from 'react-icons/pi'
import { Button } from '@mui/material'
import { BiBell, BiShareAlt } from 'react-icons/bi'
import { BsFolder } from 'react-icons/bs'
import { getClasses } from '../../services/dashboard.services'
import { AppContext, SnackInfo } from '../../../../App'
import { AxiosError } from 'axios'

type ClassInfo = {
  id: number
  description: string
  start_date: string
  end_date: string
  open_for_enrollment: boolean
  course_code: string
  course_name: string
  branch_name: string
}

export default function Dashboard() {
  const [classes, setClasses] = useState<ClassInfo[]>([])
  const { setSnack } = useContext(AppContext)
  useEffect(() => {
    const classes = async () => {
      try {
        const { data } = await getClasses<ClassInfo[]>()
        const modifiedRows = data.map((row: ClassInfo) => {
          return {
            ...row,
            start_date: row.start_date.substring(0, 10),
            end_date: row.end_date.substring(0, 10),
          }
        })
        setClasses(modifiedRows)
        console.log(modifiedRows)
      } catch (error) {
        if (error instanceof AxiosError) {
          setSnack({
            open: true,
            type: 'error',
            message: error.response?.data.message,
          } as SnackInfo)
        }
      }
    }
    classes()
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {classes.map((item, indx) => (
            <div
              key={indx}
              className={styles.card}
            >
              <CardDash
                icon={
                  <>
                    <Button size='small'>
                      <PiStudentFill />
                    </Button>
                    <Button size='small'>
                      <BiBell />
                    </Button>
                    <Button size='small'>
                      <BsFolder />
                    </Button>
                    <Button size='small'>
                      <BiShareAlt />
                    </Button>
                  </>
                }
                id={item.id}
                heading={<span> {`${item.course_code} ${item.course_name}`} </span>}
              >
                {item.description ? (
                  <p>{item.description}</p>
                ) : (
                  <p>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                  </p>
                )}
              </CardDash>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
