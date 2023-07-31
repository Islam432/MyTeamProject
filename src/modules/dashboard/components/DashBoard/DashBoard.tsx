import styles from './Dashboard.module.scss'
import { PiStudentFill } from 'react-icons/pi'
import { Button, MenuItem } from '@mui/material'
import { BiBell, BiShareAlt } from 'react-icons/bi'
import { BsFolder } from 'react-icons/bs'
import { mokData } from './mokData'
import { useContext, useEffect, useState } from 'react'
import Modal from '../../../../shared/components/Modal/Modal'
import CardDash from '../../../../shared/components/CardDash/CardDash'
import { AppContext } from '../../../../App'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { CssButton, CssTextField } from '../../../../shared/components/CustomMUI/index'
import CustomSelect from '../../../../shared/components/Select/Select'
import { z } from 'zod'
import { ClassesSchema } from '../../../../shared/schemas/classes.schema'
import { findCourse } from '../../../../modules/course-templates/services/course.services'
import Cookies from 'js-cookie'
import { AiOutlinePlus } from 'react-icons/ai'
import { CourseTemplate } from 'src/modules/course-templates/components/CoursePage/Course-page'

interface Course {
  course_id: number
  name: string
}

export type FormCardAdd = z.infer<typeof ClassesSchema>
export default function Dashboard() {
  const [open, setOpen] = useState<boolean>(false)
  const [course, setCourse] = useState<Course[]>([])
  const { setSnackbarMessage } = useContext(AppContext)
  const token = Cookies.get('token')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCardAdd>({
    resolver: zodResolver(ClassesSchema),
  })

  const onSubmit = async (formData: FormCardAdd) => {
    try {
      console.log('formData')
    } catch (error: AxiosError | any) {
      setSnackbarMessage(error.response.message)
    }
  }

  const soft = mokData
  const handleCloseModal = () => {
    setOpen(false)
  }

  const request = async () => {
    try {
      const res = await findCourse(token)
      setCourse(res.data)
    } catch (error: any) {
      setSnackbarMessage(error.message)
    }
  }
  useEffect(() => {
    request()
  }, [])
  return (
    <>
      <div className={styles.title}>
        <h1>Dashboard</h1>
        <Button
          variant='contained'
          color='primary'
          className={styles.addbtn}
          onClick={() => {
            setOpen(!open)
          }}
        >
          <AiOutlinePlus style={{ fontSize: '30px', width: 'max-content' }} />
        </Button>
        <Modal
          title='Добавить новый курс'
          desc=''
          submit={handleSubmit(onSubmit)}
          isOpen={open}
          onClose={handleCloseModal}
          btn={
            <CssButton
              type='submit'
              variant='contained'
              fullWidth
              color='primary'
              className={styles.signUp__btn}
            >
              Добавить курс
            </CssButton>
          }
        >
          <CssTextField
            label='Названия группы'
            type='text'
            {...register('course_code')}
            error={!!errors.course_code}
            helperText={errors.course_code?.message}
          >
            <MenuItem>hello</MenuItem>
          </CssTextField>

          <CustomSelect
            label='Офисы'
            idInput='branch_name'
            {...register('branch_name')}
            error={!!errors.branch_name}
            helperText={errors.branch_name?.message}
          >
            <option value='hello'>Hello</option>
          </CustomSelect>
          <CustomSelect
            label='Группа'
            id='course_name'
            {...register('course_name')}
            error={!!errors.course_name}
            helperText={errors.course_name?.message}
          >
            {course.map((data) => {
              return <MenuItem value={data.course_id}>{data.name}</MenuItem>
            })}
          </CustomSelect>
          <CssTextField
            label='Описания курса'
            type='text'
            fullWidth
            multiline
            minRows={3}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Modal>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {soft.map((item, indx) => (
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
                {...item}
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
