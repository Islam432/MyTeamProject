import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {
  addCourse,
  deleteCourse,
  findCourse,
  findOneCourse,
  findaAllLevel,
  updateCourse,
} from '../../services/course.services'
import styles from './style.module.scss'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { Button, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import Modal from '../../../../shared/components/Modal/Modal'
import { CssButton, CssTextField } from './../../../../shared/components/CustomMUI'
import CardDash from '../../../../shared/components/CardDash/CardDash'
import CustomSelect from '../../../../shared/components/Select/Select'
import { AiOutlinePlus } from 'react-icons/ai'
import { CgMoreO } from 'react-icons/cg'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { CgClose } from 'react-icons/cg'
import { AiFillCloseSquare } from 'react-icons/ai'
interface CourseTemplate {
  name: string
  course_id: number
  level_name: string
  description: string
  agenda: string
}
interface Level {
  id: number
  level_name: string
}

export interface CourseTemplateManipulate {
  name: string
  description: string
  level: number
  agenda: string
}
export default function CoursePage() {
  const [course, setCourse] = useState<CourseTemplate[] | any>([])
  const [level, setLevel] = useState<string[] | any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [add, setAdd] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const [more, setMore] = useState<boolean>(false)
  const [idChangeCourse, setIdChangeCourse] = useState<number>(0)
  const [oneCourse, setOneCourse] = useState<CourseTemplate>()
  const token = Cookies.get('token')

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm<CourseTemplateManipulate>()

  const onSubmit = async (formCourse: CourseTemplateManipulate) => {
    try {
      const response = await updateCourse(token, idChangeCourse, formCourse)
      setOpen(false)
      request()
      reset()
    } catch (error: AxiosError | any) {
      console.log(error)
    }
  }

  const addCourses = async (formCourseNew: CourseTemplateManipulate) => {
    try {
      const response = await addCourse(token, formCourseNew)
      setAdd(false)
      request()
      reset()
    } catch (error: AxiosError | any) {
      console.log(error)
    }
  }

  const dropCourse = async (id: number) => {
    try {
      const response = await deleteCourse(token, id)
      request()
    } catch (error) {}
  }

  const moreCourse = async (id: number) => {
    setMore(true)
    try {
      const response = await findOneCourse(token, id)
      setOneCourse(response.data)
    } catch (error) {}
  }

  async function request() {
    try {
      const response = await findCourse(token)
      const resLevel = await findaAllLevel(token)
      setCourse(response.data)
      setLevel(resLevel.data)
    } catch (error) {}
  }
  useEffect(() => {
    request()
  }, [])

  return (
    <div className={course}>
      <h1>Страница шаблонов курсов</h1>
      <CssButton
        className={styles.course__add}
        onClick={() => setAdd(true)}
        sx={{ minWidth: '60px' }}
      >
        <AiOutlinePlus style={{ fontSize: '30px', width: 'max-content' }} />
      </CssButton>

      <div className={styles.wrapper}>
        <div className={styles.course__cards}>
          {course.map((data: CourseTemplate) => {
            return (
              <>
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
                      <Button onClick={() => setAlert(true)}>
                        <MdDelete />
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(true)
                          setIdChangeCourse(data.course_id)
                        }}
                      >
                        <FaEdit />
                      </Button>
                      <Button onClick={() => moreCourse(data.course_id)}>
                        <CgMoreO />
                      </Button>
                    </>
                  }
                >
                  <span>
                    <b>Уровень:</b> {data.description}
                  </span>
                </CardDash>
                <Modal
                  title='Вы точно хотите удалить'
                  onClose={() => setAlert(false)}
                  isOpen={alert}
                  btn={
                    <>
                      <CssButton
                        fullWidth
                        onClick={() => {
                          dropCourse(data.course_id)
                          setAlert(false)
                        }}
                      >
                        Да
                      </CssButton>
                      <CssButton
                        fullWidth
                        sx={{ background: 'tomato !important' }}
                        onClick={() => setAlert(false)}
                      >
                        Нет
                      </CssButton>
                    </>
                  }
                >
                  <p>
                    <b>Курс:</b> {data.name}
                  </p>
                </Modal>
              </>
            )
          })}
        </div>
      </div>
      <Modal
        submit={handleSubmit(onSubmit)}
        title='Заполните поля'
        isOpen={open}
        onClose={() => setOpen(false)}
        btn={
          <>
            <CssButton
              fullWidth
              variant='contained'
              sx={{ background: 'tomato !important' }}
              onClick={() => setOpen(false)}
            >
              Отменить
            </CssButton>
            <CssButton
              fullWidth
              type='submit'
              variant='contained'
              sx={{ margin: 0 }}
            >
              Изменить
            </CssButton>
          </>
        }
      >
        <CssTextField
          label='Заголовок'
          type='text'
          {...register('name')}
        />
        <CssTextField
          label='Описание'
          type='text'
          {...register('description')}
          multiline
          rows={3}
        />
        <CustomSelect
          id='xz'
          label='Уровень'
          {...register('level')}
        >
          {level.map((data: Level) => {
            return <MenuItem value={data.id}>{data.level_name}</MenuItem>
          })}
        </CustomSelect>
        <CssTextField
          label='Структура курса'
          type='text'
          {...register('agenda')}
        />
      </Modal>
      <Modal
        submit={handleSubmit(addCourses)}
        title='Заполните поля'
        isOpen={add}
        onClose={() => setAdd(false)}
        btn={
          <>
            <CssButton
              fullWidth
              variant='contained'
              sx={{ background: 'tomato !important' }}
              onClick={() => setAdd(false)}
            >
              Отменить
            </CssButton>
            <CssButton
              fullWidth
              type='submit'
              variant='contained'
              sx={{ margin: 0 }}
            >
              Добавить
            </CssButton>
          </>
        }
      >
        <CssTextField
          label='Заголовок'
          type='text'
          {...register('name')}
        />
        <CssTextField
          label='Описание'
          type='text'
          {...register('description')}
          multiline
          rows={3}
        />
        <CustomSelect
          id='xz'
          label='Уровень'
          {...register('level')}
        >
          {level.map((data: Level) => {
            return <MenuItem value={data.id}>{data.level_name}</MenuItem>
          })}
        </CustomSelect>
        <CssTextField
          label='Структура курса'
          type='text'
          {...register('agenda')}
        />
      </Modal>
      <Modal
        title={`Курс: ${oneCourse?.name}`}
        isOpen={more}
        btn={
          <CssButton
            fullWidth={false}
            className={styles.course__closeModal}
            onClick={() => setMore(false)}
          >
            <CgClose />
          </CssButton>
        }
        onClose={() => setMore(false)}
      >
        <img
          src='./ger3.jpg'
          alt=''
          style={{ borderRadius: '8px' }}
        />
        <p>
          <b>Уровень:</b> {oneCourse?.level_name}
        </p>
        <p>
          <b>Описание:</b> {oneCourse?.description}
        </p>
        <p>
          <b>Повестка дня:</b> {oneCourse?.description}
        </p>
      </Modal>
    </div>
  )
}
