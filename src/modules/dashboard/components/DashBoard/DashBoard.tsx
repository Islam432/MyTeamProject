import { useContext, useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { PiStudentFill } from 'react-icons/pi'
import { Button, Checkbox, FormControlLabel, MenuItem } from '@mui/material'
import { BiBell, BiShareAlt } from 'react-icons/bi'
import { BsFolder } from 'react-icons/bs'
import Modal from '../../../../shared/components/Modal/Modal'
import CardDash from '../../../../shared/components/CardDash/CardDash'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CssButton, CssFab, CssTextField } from '../../../../shared/components/CustomMUI/index'
import CustomSelect from '../../../../shared/components/Select/Select'
import { z } from 'zod'
import { ClassesSchema } from '../../../../shared/schemas/classes.schema'
import { AiOutlinePlus } from 'react-icons/ai'
import { findOffice, sendClass } from '../../../../shared/services/dashboard.services'
import { findCourse } from '../../../../shared/services/course.services'
import { AxiosError } from 'axios'
import { AppContext } from '../../../../App'
import { getClasses } from '../../../../shared/services/class.service'

interface Course {
  course_id: number
  name: string
}

interface Office {
  id: number
  name: string
}

interface ClassInfo {
  id: number
  description: string
  start_date: string
  end_date: string
  open_for_enrollment: boolean
  course_code: string
  course_name: string
  branch_name: string
}

export type FormCardAdd = z.infer<typeof ClassesSchema>
export default function Dashboard() {
  const [open, setOpen] = useState<boolean>(false)
  const [course, setCourse] = useState<Course[]>([])
  const [classes, setClasses] = useState<ClassInfo[]>([])
  const [office, setOffice] = useState<Office[]>([])
  const { openErrorMessage } = useContext(AppContext)

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
      await sendClass(formData)
      reset()
      setOpen(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        openErrorMessage(error.response?.data.message)
      }
    }
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

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
          openErrorMessage(error.response?.data.message)
        }
      }
    }
    classes()
  }, [openErrorMessage])

  useEffect(() => {
    const init = async () => {
      try {
        const res = await findCourse()
        const resOffice = await findOffice()
        setOffice(resOffice.data)
        setCourse(res.data)
      } catch (error) {
        //
      }
    }
    init()
  }, [])

  return (
    <>
      <div className={styles.title}>
        <h1>Dashboard</h1>
        <CssFab
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
          <FormControlLabel
            {...register('open_for_enrollment')}
            control={<Checkbox defaultChecked />}
            label='Открыть курс'
          />
        </Modal>
      </div>
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
