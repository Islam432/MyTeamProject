import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import CustomSelect from '../../../../shared/components/Select/Select'
import { CssTextField } from '../../../../shared/components/CustomMUI'
import { ClassesSchema } from '../../../../shared/schemas/classes.schema'
import styles from './DashBoard.module.scss'
import { AppContext } from '../../../../App'
import { useContext } from 'react'
import { AxiosError } from 'axios'
export type FormData = z.infer<typeof ClassesSchema>
const CardAddForm = () => {
  const { setSnackbarMessage } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ClassesSchema),
  })
  const onSubmit = async (formData: FormData) => {
    try {
      await addCard(formData)
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
            idInput='course_code'
            change={() => {
              return
            }}
            {...register('course_code')}
            error={!!errors.course_code}
            helperText={errors.course_code?.message}
          >
            <option>hello</option>
          </CssTextField>
          <CustomSelect
            label='Названия улицы'
            idInput='branch_name'
            change={() => {
              return
            }}
            {...register('branch_name')}
            error={!!errors.branch_name}
            helperText={errors.branch_name?.message}
          >
            <option>hello</option>
          </CustomSelect>
          <CustomSelect
            label='Категория курса'
            idInput='course_name'
            change={() => {
              return
            }}
            {...register('course_name')}
            error={!!errors.course_name}
            helperText={errors.course_name?.message}
          >
            <option>hello</option>
          </CustomSelect>
        </div>
        <div>
          <CssTextField
            size='small'
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
            size='small'
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
            size='small'
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
            size='small'
            label='Открыть курс'
            type='date'
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
