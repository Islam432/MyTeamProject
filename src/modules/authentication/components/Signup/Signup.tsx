import { useForm } from 'react-hook-form'
import { IconButton, InputAdornment } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '../../services/auth.service'
import { UserSchema } from '../../../../shared/schemas/user.schema'
import {z} from 'zod'
import { useContext, useState } from 'react'
import styles from './Signup.module.scss'
import { CssButton, CssTextField } from '../../../../shared/components/CustomMUI'
import { FaRegEyeSlash } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'
import { NavLink, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { AppContext } from '../../../../App'

export type FormData = z.infer<typeof UserSchema>

export default function Signup() {
  const [show, setShow] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setSnackbarMessage } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  })

  const onSubmit = async (formData: FormData) => {
    try {
      await registerUser(formData)
      navigate('/signin')
    } catch (error: AxiosError | any) {
      setSnackbarMessage(error.response.message)
    }
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
              size='small'
              label='Имя'
              type='text'
              {...register('first_name')}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          </div>
          <div>
            <CssTextField
              size='small'
              label='Фамилия'
              type='text'
              {...register('last_name')}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </div>
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
              type={!show ? 'password' : 'text'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShow(!show)}
                      edge='end'
                    >
                      {show ? <FaRegEyeSlash /> : <BiShow />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <CssTextField
            size='small'
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
              size='small'
              label='Контактный номер'
              type='number'
              inputProps={{ maxLength: 10 }}
              placeholder='Пример:0555-555-555'
              {...register('contact_number')}
              error={!!errors.contact_number}
              helperText={errors.contact_number?.message}
            />
          </div>
          <CssButton
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Зарегистрироваться
          </CssButton>
        </form>
        <div className={styles.signUp__help}>
          <p>
            Если у вас уже есть аккаунт то вы можете <NavLink to='/signin'>Авторизоваться</NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}
