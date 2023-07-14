import { useForm } from 'react-hook-form'
import { Alert, Button, IconButton, Input, Snackbar } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '../../services/auth.service'
import { UserSchema } from '../../../../shared/schemas/user.schema'
import z from 'zod'
import { useState } from 'react'
import styles from './Signup.module.scss'
import { CssTextField } from '../../../../shared/components/CustomMUI'
import { FaRegEyeSlash } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'
import { NavLink, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export type FormData = z.infer<typeof UserSchema>

function Signup() {
  const [open, setOpen] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')

  const redirect = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  })

  const onSubmit = async (data: FormData) => {
    UserSchema.parse(data)
    try {
      const response = await registerUser(data)
      redirect('/signin')
      setOpen(false)
    } catch (error: AxiosError | any) {
      setOpen(true)
      setErr(error.response.message)
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
        </form>
        <div className={styles.signUp__help}>
          <p>
            Если у вас уже есть аккаунт то вы можете <NavLink to='/signin'>Авторизоваться</NavLink>
          </p>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity='error'
          className={styles.signUp__snackbar}
        >
          E-mail уже зарегистрирован
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Signup