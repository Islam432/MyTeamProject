import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { CssTextField } from '../../../../shared/components/CustomMUI'
import { ClassesSchema } from '../../../../shared/schemas/classes.schema'
import styles from './DashBoard.module.scss'
const CardAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ClassesSchema),
  })
  return (
    <>
      <form
        className={styles.signUp__form}
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <CssTextField
            size='small'
            label='Названия группы'
            type='number'
            inputProps={{ maxLength: 10 }}
            placeholder='Пример:0555-555-555'
            {...register('course_code')}
            error={!!errors.course_code}
            helperText={errors.course_code?.message}
          />
        </div>
        <div>
          <CssTextField
            size='small'
            label='Названия улицы'
            type='number'
            inputProps={{ maxLength: 10 }}
            placeholder='Пример:0555-555-555'
            {...register('branch_name')}
            error={!!errors.branch_name}
            helperText={errors.branch_name?.message}
          />
        </div>
        <div>
          <CssTextField
            size='small'
            label='Названия курса'
            type='number'
            inputProps={{ maxLength: 10 }}
            placeholder='Пример:0555-555-555'
            {...register('course_name')}
            error={!!errors.course_name}
            helperText={errors.course_name?.message}
          />
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
          />
          <CssTextField
            size='small'
            label='Конец курсов'
            type='date'
            {...register('end_date')}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
          />
          <CssTextField
            size='small'
            label='Открыть курс'
            type='date'
            {...register('open_for_enrollment')}
            error={!!errors.open_for_enrollment}
            helperText={errors.open_for_enrollment?.message}
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
