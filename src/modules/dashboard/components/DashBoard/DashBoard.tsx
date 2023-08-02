import styles from './Dashboard.module.scss'
import { PiStudentFill } from 'react-icons/pi'
import { Button, Checkbox, FormControlLabel, MenuItem } from '@mui/material'
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
import { CssButton, CssFab, CssTextField } from '../../../../shared/components/CustomMUI/index'
import CustomSelect from '../../../../shared/components/Select/Select'
import { z } from 'zod'
import { ClassesSchema } from '../../../../shared/schemas/classes.schema'
import { findCourse } from '../../../../modules/course-templates/services/course.services'
import Cookies from 'js-cookie'
import { AiOutlinePlus } from 'react-icons/ai'
import { findOffice, sendClass } from '../../services/dashboard.services'

interface Course {
  course_id: number
  name: string
}

interface Office {
  id: number
  name: string
}

export type FormCardAdd = z.infer<typeof ClassesSchema>
export default function Dashboard() {
  const [open, setOpen] = useState<boolean>(false)
  const [course, setCourse] = useState<Course[]>([])
  const [office, setOffice] = useState<Office[]>([])
  const { setSnackbarMessage } = useContext(AppContext)
  const token = Cookies.get('token')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormCardAdd>({
    resolver: zodResolver(ClassesSchema),
  })

  const onSubmit = async (formData: FormCardAdd) => {
    try {
      const res = await sendClass(token, formData)
      reset()
      setOpen(false)
    } catch (error: AxiosError | any) {
      setSnackbarMessage(error.response.message)
    }
  }

  const soft = mokData
  const handleCloseModal = () => {
    setOpen(false)
  }
  useEffect(() => {
    const request = async () => {
      try {
        const res = await findCourse(token)
        const resOffice = await findOffice(token)
        setOffice(resOffice.data)
        setCourse(res.data)
      } catch (error: any) {
        setSnackbarMessage(error.message)
      }
    }
    request()
  }, [])

  return (
    <>
      <div className={styles.title}>
        <h1>Dashboard</h1>
        <CssFab
          // className={styles.addbtn}
          onClick={() => {
            setOpen(!open)
          }}
        >
          <AiOutlinePlus style={{ fontSize: '30px', width: 'max-content' }} />
        </CssFab>
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
            id='branch_name'
            {...register('branch_id')}
            error={!!errors.branch_id}
            helperText={errors.branch_id?.message}
          >
            {office.map((data) => {
              return <MenuItem value={data.id}>{data.name}</MenuItem>
            })}
          </CustomSelect>
          <CustomSelect
            label='Группа'
            id='course_name'
            {...register('course_id')}
            error={!!errors.course_id}
            helperText={errors.course_id?.message}
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
          <CssTextField
            label='Начало курсов'
            type='date'
            {...register('start_date')}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <CssTextField
            label='Конец курсов'
            type='date'
            {...register('end_date')}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <CssTextField
            label='Открыть курс'
            sx={{
              width: '100px',
              margin: 'auto',
              '& input': {
                height: '90px',
                width: '90px',
                margin: 'auto',
                backgroundColor: '#fc0',
              },
            }}
            type='checkbox'
            {...register('open_for_enrollment')}
            error={!!errors.open_for_enrollment}
            helperText={errors.open_for_enrollment?.message}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
          <FormControlLabel
            {...register('open_for_enrollment')}
            control={<Checkbox defaultChecked />}
            label='Открыть курс'
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
