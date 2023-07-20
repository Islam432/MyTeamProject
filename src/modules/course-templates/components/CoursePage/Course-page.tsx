import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { deleteCourse, findCourse } from '../../services/course.services'
import CardDash from '../../../dashboard/components/CardDash/CardDash'
import styles from './style.module.scss'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { Button } from '@mui/material'

interface CourseTemplate {
  name: string
  course_id: number
  level_name: string
  description: string
  agenda: string
}
export default function CoursePage() {
  const [course, setCourse] = useState<CourseTemplate[] | any>([])
  const token = Cookies.get('token')

  const dropCourse = async (id: number) => {
    try {
      const response = await deleteCourse(token, id)
      console.log(response.data)
      const res = await findCourse(token)
      setCourse(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function request() {
      try {
        const response = await findCourse(token)
        setCourse(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [])
  console.log(course)

  return (
    <div>
      <h1>Страница шаблонов курсов</h1>
      <div className={styles.course__cards}>
        {course.map((data: CourseTemplate) => {
          return (
            <CardDash
              img='./ger3.jpg'
              id={data.course_id}
              bc1='#fc0'
              bc2='#333'
              color='#1e1e1e'
              color2='#333'
              bt='#fc0'
              title={data.name}
              icon={
                <>
                  <Button onClick={() => dropCourse(data.course_id)}>
                    <MdDelete />
                  </Button>
                  <Button>
                    <FaEdit />
                  </Button>
                </>
              }
            >
              <p>
                <b>Описание:</b> {data.description}
              </p>
              <span>
                <b>Уровень:</b> {data.description}
              </span>
              <p>
                <b>Повестка дня:</b> {data.agenda}
              </p>
            </CardDash>
          )
        })}
      </div>
    </div>
  )
}
