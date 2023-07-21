import { useEffect } from 'react'
import styles from './styles.module.scss'
import Cookies from 'js-cookie'
import { getOneUsers } from './server'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


function parseJwt(token: any) {
  if (!token) {
    return
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}
const AccountComponents = () => {
  useEffect(() => {
    const token = Cookies.get('token')
    const decodedToken = parseJwt(token)

    async function request() {
      try {
        const dataOne = await getOneUsers(decodedToken, token)
        console.log(dataOne.data, token)
      } catch (error) {}
    }
    request()
  }, [])

  return(
    <div className={styles.cont}>
          <div className={styles.box}>
          <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
          </div>

          <div className={styles.box}>

          </div>


    </div>
  )
 
}

export default AccountComponents
