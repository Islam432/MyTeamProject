import { useEffect, useState } from 'react'
import CardDash from '../CardDash/CardDash'
import styles from './Dashboard.module.scss'
import { PiStudentFill } from 'react-icons/pi'
import { Button } from '@mui/material'
import { BiBell, BiShareAlt } from 'react-icons/bi'
import { BsFolder } from 'react-icons/bs'
import { getClassesCard } from '../../services/dashboard.services'
// import { mokData } from './mokData'

interface ClassesCard {
  id: number
  description: string
  start_date: string
  end_date: string
  open_for_enrollment: boolean
  course_code: string
  branch_name: string
  course_name: string
  bc1: string
  bc2: string
  color: string
  color2: string
  bt: string
}

export default function Dashboard() {
  const [classes, setClasses] = useState<ClassesCard[]>([])
  // const soft = mokData
  useEffect(() => {
    const classes = async () => {
      try {
        const { data } = await getClassesCard()
        const modifiedRows = data.map((row: any) => {
          return {
            ...row,
            start_date: row.start_date.substring(0, 10),
            end_date: row.end_date.substring(0, 10),
          }
        })
        setClasses(modifiedRows)
      } catch (error) {
        console.log(error)
      }
    }
    classes()
  }, [])
  console.log(classes)

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
                text={item.course_code}
                description={item.description}
                course_name={item.course_name}
                // img={item.image}
                bc1={item.bc1}
                bc2={item.bc2}
                color={item.color}
                color2={item.color2}
                bt={item.bt}
                // id={item.id}
                // image={item.image}
                // bc1={item.bc1}
                // bc2={item.bc2}
                // title={item.title}
                // color={item.color}
                // color2={item.color2}
                // bt={item.bt}
              >
                <p>
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  continents except Antarctica
                </p>
              </CardDash>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
