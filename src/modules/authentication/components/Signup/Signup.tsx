import { useForm } from 'react-hook-form'
import { Alert, Button, IconButton, Input, Snackbar } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from './servers'
import { UserSchema } from '../../../../shared/schemas/user.schema'
import z from 'zod'
import { useState } from 'react'
import styles from './Signup.module.scss'
import { CssTextField } from '../../../../shared/components/CustomMUI'
import { FaRegEyeSlash } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'

export type FormData = z.infer<typeof UserSchema>

const Signup = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  })

  function onSubmit(data: FormData) {
    UserSchema.parse(data)
    registerUser(data)
    setOpen(true)
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.signUp__content}>
        <div className={styles.signUp__title}>
          <img
            src='./logo.svg'
            alt=''
          />
          <h1 className={styles.signUp__subTitle}>Регистрация</h1>
        </div>
        <form
          className={styles.signUp__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <CssTextField
              label='Имя'
              type='text'
              {...register('first_name')}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          </div>
          <div>
            <CssTextField
              label='Фамилия'
              type='text'
              {...register('last_name')}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </div>
          <div>
            <CssTextField
              label='Email'
              type='email'
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>
          <div>
            <CssTextField
              label='Пароль'
              type={!show ? 'password' : 'text'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShow(!show)}
            >
              {show ? <FaRegEyeSlash /> : <BiShow />}
            </IconButton>
          </div>
          <CssTextField
            label='Дата рождения'
            type='date'
            {...register('date_of_birth')}
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div>
            <CssTextField
              label='Контактный номер'
              type='number'
              inputProps={{ maxLength: 10 }}
              placeholder='Пример:0555-555-555'
              {...register('contact_number')}
              error={!!errors.contact_number}
              helperText={errors.contact_number?.message}
            />
          </div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={styles.signUp__btn}
          >
            Зарегистрироваться
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity='error'
              className={styles.snackbar}
            >
              Такой email уже есть !!!
            </Alert>
          </Snackbar>
        </form>
        <div className={styles.signUp__help}>
          <p>Если у вас уже есть аккаунт то вы можете </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
