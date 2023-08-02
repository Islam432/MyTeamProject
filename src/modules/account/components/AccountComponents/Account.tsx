import { useCallback, useContext, useEffect, useState } from 'react'
import { ubdateUser, getOneUser } from '../../../../shared/services/account.service'
import { AppContext } from './../../../../App'
import styles from './Account.module.scss'
import man from './../../../../../public/man.png'
import { Chip, Card, CardContent, Typography, Button, CardActions } from '@mui/material'
import Modal from '../../../../../src/shared/components/Modal/Modal'
import { useForm } from 'react-hook-form'
import { CssButton, CssTextField } from '../../../../../src/shared/components/CustomMUI'
import { AxiosError } from 'axios'

export interface Contact {
  id?: number
  first_name: string
  last_name: string
  contact_number: string
  date_of_birth: string
  email: string
  is_active?: boolean
  role_name?: string
}

export default function Account() {
  const [visbl, setvisibl] = useState<boolean>(false)
  const [data, setData] = useState<Contact>({} as Contact)
  const { auth, openErrorMessage } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>()

  const request = useCallback(
    async function () {
      try {
        const { data } = await getOneUser(auth.user.id)
        console.log(data)
        setData(data)
      } catch (error) {
        if (error instanceof AxiosError) {
          openErrorMessage(error.response?.data.message)
        }
      }
    },
    [openErrorMessage, auth]
  )

  useEffect(() => {
    request()
  }, [request])

  const submitUbdate = () => {
    setvisibl((visbl) => !visbl)
  }

  const onSubmit = async (contact: Contact) => {
    try {
      await ubdateUser(auth.user.id, contact)
      request()
    } catch (error) {
      if (error instanceof AxiosError) {
        openErrorMessage(error.response?.data.message)
      }
    }
  }
  return (
    <>
      <Modal
        btn={
          <CssButton
            className={styles.ButtonModal}
            type='submit'
            variant='contained'
            color='primary'
            onClick={submitUbdate}
            fullWidth
          >
            изменить данные
          </CssButton>
        }
        title='Изменить профиль'
        onClose={() => setvisibl(false)}
        isOpen={visbl}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <CssTextField
              className={styles.input}
              fullWidth
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
              className={styles.input}
              fullWidth
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
              className={styles.input}
              fullWidth
              size='small'
              label='Email'
              type='email'
              {...register('email', {
                pattern: /^\S+@\S+$/i,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>

          <CssTextField
            className={styles.input}
            fullWidth
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
              className={styles.input}
              fullWidth
              size='small'
              label='Контактный номер'
              type='phone'
              inputProps={{ maxLength: 10 }}
              placeholder='Пример: 0555-555-555'
              {...register('contact_number')}
              error={!!errors.contact_number}
              helperText={errors.contact_number?.message}
            />
          </div>
        </form>
      </Modal>
      <h1>User profile</h1>
      <div className={styles.content}>
        <Card sx={{ maxWidth: 345, minHeight: 450 }}>
          <div className={styles.cardMedia}>
            <div className={styles.circle}>
              <img
                className={styles.img}
                src={man}
                alt=''
              />
            </div>
          </div>
          <CardContent sx={{ border: 'none' }}>
            <Typography
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
              gutterBottom
              variant='h5'
              component='div'
            >
              <p style={{ margin: '4px' }}> {data?.first_name} </p>
              <p style={{ margin: '4px' }}> {data?.last_name}</p>
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ textAlign: 'center' }}
            >
              Hello! Welcome to account customization, here you can change and add your data.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={submitUbdate}
              className={styles.button}
              sx={{ display: 'block', margin: 'auto', color: '#ffcc00' }}
              size='small'
            >
              Update
            </Button>
          </CardActions>
        </Card>

        <Card className={styles.box2}>
          <div>
            <h4>First Name:</h4>
            <p>{data?.first_name}</p>
          </div>
          <hr />
          <div>
            <h4>Last Name:</h4>
            <p>{data?.last_name}</p>
          </div>
          <hr />
          <div>
            <h4>Email:</h4>
            <p>{data?.email}</p>
          </div>
          <hr />
          <div>
            <h4>Phone:</h4>
            <p>{data?.contact_number}</p>
          </div>
          <hr />
          <div>
            <h4>Date:</h4>
            <p>{data?.date_of_birth?.slice(0, 10)}</p>
          </div>
          <hr />
          <div>
            <h4>Role:</h4>
            <p>{data?.role_name}</p>
          </div>
          <hr />
          <div>
            <h4>Status: </h4>
            <p>
              <Chip
                className={styles[data?.is_active ? 'cpActive' : 'cpFalse']}
                label={data?.is_active ? 'Active' : 'Inactive'}
              />
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}
