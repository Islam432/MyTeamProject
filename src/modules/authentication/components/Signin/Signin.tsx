import { memo, useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconButton, InputAdornment } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { authorization } from '../../../../shared/services/auth.service'
import { FaRegEyeSlash } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'
import styles from './Signin.module.scss'
import { AxiosError } from 'axios'
import { CssButton, CssTextField } from '../../../../shared/components/CustomMUI'
import { AppContext } from '../../../../App'

export interface FormAuth {
  email: string
  password: string
}

const Signin = memo(function () {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { auth, openErrorMessage } = useContext(AppContext)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormAuth>()

  const onSubmit = useCallback(
    async (formAuthData: FormAuth) => {
      try {
        const { data } = await authorization(formAuthData)
        auth.login(data.token)
      } catch (error) {
        if (error instanceof AxiosError) {
          openErrorMessage(error.response?.data.message)
        }
      }
    },
    [auth, openErrorMessage]
  )

  return (
    <div className={styles.signIn}>
      <div className={styles.signIn__content}>
        <div className={styles.signIn__title}>
          <img
            src='../../../../../public/logoipsum-2.svg'
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
          <CssButton
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            className={styles.signIn__btn}
          >
            Авторизироваться
          </CssButton>
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

export default Signin
