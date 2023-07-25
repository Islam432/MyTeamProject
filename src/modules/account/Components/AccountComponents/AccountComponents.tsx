import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Cookies from 'js-cookie'
import { getOneUsers } from './server'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'

interface Contact {
  contact_number: string
  date_of_birth: string
  email: string
  first_name: string
  id: number
  is_active: boolean
  last_name: string
  role_name: string
}
function parseJwt(token: any) {
  if (!token) {
    return
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}
const AccountComponents = () => {
  const [data, setData] = useState<Contact>()

  useEffect(() => {
    const token = Cookies.get('token')
    const decodedToken = parseJwt(token)

    async function request() {
      try {
        const { data } = await getOneUsers(decodedToken, token)
        console.log(data)
        setData(data)
      } catch (error) {}
    }
    request()
  }, [])

  return (
    <div className={styles.cont}>
      <div className={styles.box}>
        <Card sx={{ maxWidth: 345 }}>

          <div className={styles.cardMedia}>
            <div className={styles.curcle}>
             <img style={{ width: "100%", height: "auto" , objectFit: 'cover'}} src="../../../../../public/default-ava.avif" alt="" />
            </div>
          </div>
          {/* <CardMedia
            className={styles.img}
            component='img'
            alt='green iguana'
            height='140'
            image='../../../../public/nonePhotoUsers.avif'
          /> */}
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
      </div>

      <Card className={styles.box}>
        <div className={styles.table}>
          <h4 className={styles.label}>Name:</h4>
          <p className={styles.datatext}>{data?.first_name}</p>
        </div>
        <hr className={styles.hr1} />
        <div className={styles.table}>
          <h4 className={styles.label}>LastName:</h4>
          <p className={styles.datatext}>{data?.last_name}</p>
        </div>
        <hr className={styles.hr1} />
        <div className={styles.table}>
          <h4 className={styles.label}>Email:</h4>
          <p className={styles.datatext}>{data?.email}</p>
        </div>
        <hr className={styles.hr1} />
        <div className={styles.table}>
          <h4 className={styles.label}>Phone:</h4>
          <p className={styles.datatext}>{data?.contact_number}</p>
        </div>
        <hr className={styles.hr1} />
        <div className={styles.table}>
          <h4 className={styles.label}>Date:</h4>
          <p className={styles.datatext}>{data?.date_of_birth}</p>
        </div>
        <hr className={styles.hr1} />
        <div className={styles.table}>
          <h4 className={styles.label}>Status:</h4>
          <p className={styles.datatext}>{data?.role_name}</p>
        </div>
      </Card>
    </div>
  )
}

export default AccountComponents
