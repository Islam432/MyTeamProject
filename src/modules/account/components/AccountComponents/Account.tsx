import { useContext, useEffect, useState } from 'react'
import { getOneUser } from '../../services/account.service'
import { AppContext } from './../../../../App'
import styles from './Account.module.scss'
import man from './../../../../../public/man.png'
import { Chip, Card, CardContent, Typography, Button, CardActions } from '@mui/material'

interface Contact {
  id: number
  first_name: string
  last_name: string
  contact_number: string
  date_of_birth: string
  email: string
  is_active: boolean
  role_name: string
}

export default function Account() {
  const [data, setData] = useState<Contact>()
  const { auth } = useContext(AppContext)

  useEffect(() => {
    async function request() {
      try {
        const { data } = await getOneUser(auth.user.id)
        console.log(data)
        setData(data)
      } catch (error) {}
    }
    request()
  }, [])

  return (
    <>
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
            <p>{data?.date_of_birth.slice(0, 10)}</p>
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
                size='small'
              />
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}
