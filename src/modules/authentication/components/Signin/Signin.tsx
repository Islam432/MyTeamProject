import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, IconButton, Snackbar, TextField } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { authorization } from '../../services/auth.service'
import { FaRegEyeSlash } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'
import styles from './Signin.module.scss'
import { AxiosError } from 'axios'
import { CssTextField } from '../../../../shared/components/CustomMUI'
import Cookies from 'js-cookie'

export interface FormAuth {
  email: string
  password: string
}

function SignIn() {
  const [open, setOpen] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormAuth>()

  const onSubmit = async (data: FormAuth) => {
    try {
      const response = await authorization(data)
      Cookies.set('token', response.data.token)
      setOpen(false)
    } catch (error: AxiosError | any) {
      setOpen(true)
      setErr(error.response.data.message)
    }
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signIn__content}>
        <div className={styles.signIn__title}>
          <img
            src='./logo.svg'
            alt=''
          />
          <h1 className={styles.signIn__subTitle}>Авторизация</h1>
        </div>
        <form
          className={styles.signIn__form}
          onSubmit={handleSubmit(onSubmit)}
        >
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
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <BiShow />}
            </IconButton>
          </div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={styles.signIn__btn}
          >
            Авторизироваться
          </Button>
        </form>
        <div className={styles.signIn__help}>
          <p>
            Если у вас нет аккаунта, то вы можете <NavLink to='/signup'>Зарегистрироваться</NavLink>
          </p>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity='error'
            className={styles.signIn__snackbar}
          >
            {err}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default SignIn
