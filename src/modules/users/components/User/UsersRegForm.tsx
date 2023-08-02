import { BiShow } from 'react-icons/bi'
import { FaRegEyeSlash } from 'react-icons/fa'
import { registerUser } from '../../../../shared/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CssTextField } from '../../../../shared/components/CustomMUI'
import { Button, IconButton, InputAdornment } from '@mui/material'
import { useContext, useState } from 'react'
import { UserSchema } from '../../../../shared/schemas/user.schema'
import { AppContext } from '../../../../App'
import { FormData } from '../../../authentication/components/Signup/Signup'
import styles from './Users.module.scss'
import { AxiosError } from 'axios'

const UsersRegForm = () => {
  const { openErrorMessage } = useContext(AppContext)
  const [show, setShow] = useState<boolean>(false)

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
    } catch (error) {
      if (error instanceof AxiosError) {
        openErrorMessage(error.response?.data.message)
      }
    }
  }
  return (
    <div>
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

        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={styles.signUp__btn}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  )
}

export default UsersRegForm
