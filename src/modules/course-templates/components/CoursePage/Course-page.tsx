import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { deleteCourse, findCourse } from '../../services/course.services'
import CardDash from '../../../dashboard/components/CardDash/CardDash'
import styles from './style.module.scss'
import '../../../../shared/components/CustomMUI/custom.scss'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { Button, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import Modal from '../../../../shared/components/Modal/Modal'
import { CssTextField } from './../../../../shared/components/CustomMUI'

interface CourseTemplate {
  name: string
  course_id: number
  level_name: string
  description: string
  agenda: string
}

export default function CoursePage() {
  const [course, setCourse] = useState<CourseTemplate[] | any>([])
  const [open, setOpen] = useState<boolean>(false)
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
              image='./ger3.jpg'
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
                  <Button onClick={() => setOpen(true)}>
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
      <Modal
        title='dasdasdas'
        desc='asdsadasd'
        isOpen={open}
        btn={
          <>
            <Button
              onClick={() => setOpen(false)}
              sx={{ color: '#fc0' }}
            >
              Отменить
            </Button>
            <Button
              onClick={() => setOpen(false)}
              sx={{ color: '#fc0' }}
            >
              Изменить
            </Button>
          </>
        }
      >
        <CssTextField
          label='Заголовок'
          type='name'
        />
        <CssTextField
          label='Описание'
          type='description'
        />
        <FormControl>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
          <Select
            className={styles.course__age}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={age}
            label='Age'
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Modal>
    </div>
  )
}
