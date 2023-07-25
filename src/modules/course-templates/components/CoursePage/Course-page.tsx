import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { deleteCourse, findCourse, findaAllLevel } from '../../services/course.services'
import styles from './style.module.scss'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { Button, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import Modal from '../../../../shared/components/Modal/Modal'
import { CssButton, CssTextField } from './../../../../shared/components/CustomMUI'
import CardDash from '../../../../shared/components/CardDash/CardDash'
import CustomSelect from '../../../../shared/components/Select/Select'

interface CourseTemplate {
  name: string
  course_id: number
  level_name: string
  description: string
  agenda: string
}
interface level {
  id: number
  level_name: string
}

export default function CoursePage() {
  const [course, setCourse] = useState<CourseTemplate[] | any>([])
  const [level, setLevel] = useState<string[] | any>([])
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

  const updateCourse = async (id: number) => {
    try {
    } catch {}
  }

  useEffect(() => {
    async function request() {
      try {
        const response = await findCourse(token)
        const resLevel = await findaAllLevel(token)
        setCourse(response.data)
        setLevel(resLevel.data)
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [])
  console.log(level)
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
        title='Заполните поля'
        isOpen={open}
        onClose={() => setOpen(false)}
        btn={
          <>
            <CssButton
              fullWidth
              type='submit'
              variant='contained'
              sx={{ background: 'tomato !important' }}
              onClick={() => setOpen(false)}
            >
              Отменить
            </CssButton>
            <CssButton
              fullWidth
              type='submit'
              sx={{ margin: 0 }}
              variant='contained'
              onClick={() => setOpen(false)}
            >
              Изменить
            </CssButton>
          </>
        }
      >
        <CssTextField
          label='Заголовок'
          type='text'
        />
        <CssTextField
          label='Описание'
          type='text'
        />
        <CustomSelect
          idInput='xz'
          label='asdas'
          change={() => console.log('asdsa')}
        >
          {level.map((data: level) => {
            return <MenuItem value={data.id}>{data.level_name}</MenuItem>
          })}
        </CustomSelect>
        <CssTextField
          label='Повестка дня'
          type='text'
        />
      </Modal>
    </div>
  )
}
