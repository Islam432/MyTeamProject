import { useForm, RegisterOptions } from 'react-hook-form'
import { Button, TextField, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from './servers'
import { UserSchema } from '../../../../shared/schemas/user.schema'
import z from 'zod'


export type FormData = z.infer<typeof UserSchema>

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)

    UserSchema.parse(data)
    const dataRequest = {
      ...data,
      date_of_birth: new Date(data.date_of_birth),
    }
    registerUser(dataRequest)
    console.log(data)
  }

  return (
    <div style={{ background: 'white', padding: '20px' }}>
      <Typography variant='h4'>Страница регистрации</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            label='Имя'
            type='text'
            {...register('first_name')}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
        </div>

        <div>
          <TextField
            label='Фамилия'
            type='text'
            {...register('last_name')}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
        </div>

        <div>
          <TextField
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
          <TextField
            label='Пароль'
            type='password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>

        <div>
         <input type="date"
             {...register('date_of_birth')}
            
            
          />
        </div>

        <div>
          <TextField
            label='Контактный номер'
            type='text'
            {...register('contact_number')}
            error={!!errors.contact_number}
            helperText={errors.contact_number?.message}
          />
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  )
}

export default Signup
