import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import CustomSelect from '../../../../shared/components/Select/Select'
import { CssTextField } from '../../../../shared/components/CustomMUI'
import { ClassesSchema } from '../../../../shared/schemas/classes.schema'
import styles from './Dashboard.module.scss'
import { AppContext } from '../../../../App'
import { useContext } from 'react'
import { AxiosError } from 'axios'
import { z } from 'zod'

const CardAddForm = () => {
  const { setSnackbarMessage } = useContext(AppContext)

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

  return (
    <>
      <form
        className={styles.signUp__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <CssTextField
            label='Названия группы'
            type='text'
            {...register('course_code')} // Привязываем input к форме по имени поля 'course_code'
            error={!!errors.course_code} // Проверяем, есть ли ошибка для данного поля
            helperText={errors.course_code?.message} // Выводим сообщение об ошибке (если есть)
          >
            <MenuItem>hello</MenuItem>
          </CssTextField>

          <CustomSelect
            label='Названия улицы'
            idInput='branch_name'
            {...register('branch_name')}
            error={!!errors.branch_name}
            helperText={errors.branch_name?.message}
          >
            <option value='hello'>Hello</option>
          </CustomSelect>

          <CustomSelect
            label='Категория курса'
            idInput='course_name'
            {...register('course_name')}
            error={!!errors.course_name}
            helperText={errors.course_name?.message}
          >
            <option value='hello'>Hello</option>
          </CustomSelect>
        </div>

        <div>
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
        </div>

        <div>
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

          <CssTextField
            label='Открыть курс'
            type='checkbox'
            {...register('open_for_enrollment')}
            error={!!errors.open_for_enrollment}
            helperText={errors.open_for_enrollment?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={styles.signUp__btn}
        >
          Добавить курс
        </Button>
      </form>
    </>
  )
}

export default CardAddForm
