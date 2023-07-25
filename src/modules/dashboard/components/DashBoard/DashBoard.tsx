import { useEffect, useState } from 'react'
import CardDash from '../CardDash/CardDash'
import styles from './Dashboard.module.scss'
// import { mokData } from './mokData'
import { getClassesCard } from '../../services/dashboard.services'

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
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
