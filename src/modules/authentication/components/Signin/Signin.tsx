import { memo, useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { authorization } from '../../services/auth.service'
import { FaRegEyeSlash } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'
import styles from './Signin.module.scss'
import { AxiosError } from 'axios'
import { CssTextField } from '../../../../shared/components/CustomMUI'
import Cookies from 'js-cookie'
import { SnackbarContext } from '../../../../App'

export interface FormAuth {
  email: string
  password: string
}

export default memo(function Signin() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { setError, setOpenSnackbar } = useContext(SnackbarContext)
  const nav = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormAuth>()

  const onSubmit = useCallback(async (formAuthData: FormAuth) => {
    try {
      const { data } = await authorization(formAuthData)
      Cookies.set('token', data.token)
      nav('/')
    } catch (error: AxiosError | any) {
      setError(error.response.data.message)
      setOpenSnackbar(true)
    }
  }, [])

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
              size='small'
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
              size='small'
              label='Пароль'
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                      edge='end'
                    >
                      {showPassword ? <FaRegEyeSlash /> : <BiShow />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
      </div>
    </div>
  )
})
