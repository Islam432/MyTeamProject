import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Cookies from 'js-cookie'
import { getOneUsers } from './server'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'
import { CssTextField } from '../CustomMUI'


function parseJwt(token: any) {
  if (!token) {
    return
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}
const AccountComponents = () => {
  const [data, setData] = useState<any[]>([])
  
  useEffect(() => {
    const token = Cookies.get('token')
    const decodedToken = parseJwt(token)

    

    async function request() {
      try {
        const dataOne = await getOneUsers(decodedToken, token)

        setData(dataOne.data)
      } catch (error) {}
    }
    request()
  }, [])

  const DatePars = data.map((row: any) => {
    return {
      ...row,
      date_of_birth: row.date_of_birth.substring(0, 10),
    }
  })



  
  return (
    <div className={styles.cont}>
      <div className={styles.box}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
           className={styles.img}
            component='img'
            alt='green iguana'
            height='140'
            image="../../../../public/nonePhotoUsers.avif"
            // {data.picture ? data.pucture : "../../../../public/nonePhotoUsers.avif"}
          />
          <CardContent>
            <Typography
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
              gutterBottom
              variant='h5'
              component='div'
            >
             <p className={styles.par}>  {DatePars[0]?.first_name} </p>
          <p className={styles.par}>    {DatePars[0]?.last_name}</p>
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
      
            <Button className={styles.button} sx={{ display: 'block', margin: 'auto', color: '#ffcc00'   }} size='small'>Update</Button>
          </CardActions>
        </Card>
      </div>

      <div className={styles.box}>
  <div className={styles.table}>
    <h4 className={styles.label}>Name:</h4>
    <p className={styles.datatext}>{DatePars[0]?.first_name}</p>
  </div>
  <hr className={styles.hr1} />
  <div className={styles.table}>
    <h4 className={styles.label}>LastName:</h4>
    <p className={styles.datatext}>{DatePars[0]?.last_name}</p>
  </div>
  <hr className={styles.hr1} />
  <div className={styles.table}>
    <h4 className={styles.label}>Email:</h4>
    <p className={styles.datatext}>{DatePars[0]?.email}</p>
  </div>
  <hr className={styles.hr1} />
  <div className={styles.table}>
    <h4 className={styles.label}>Phone:</h4>
    <p className={styles.datatext}>{DatePars[0]?.contact_number}</p>
  </div>
  <hr className={styles.hr1} />
  <div className={styles.table}>
    <h4 className={styles.label}>Date:</h4>
    <p className={styles.datatext}>{DatePars[0]?.date_of_birth}</p>
  </div>
  <hr className={styles.hr1} />
  <div className={styles.table}>
    <h4 className={styles.label}>Status:</h4>
    <p className={styles.datatext}>{DatePars[0]?.role_name}</p>
  </div>
  <hr className={styles.hr1} />
</div>
    </div>
  )
}

export default AccountComponents
