import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Card } from '@mui/material'
import styles from './CardDash.module.scss'
import React from 'react'
interface CardDashProps {
  id: number
  heading: React.ReactNode
  children: React.ReactNode
  icon: React.ReactNode
}
export default function CardDash({ id, heading, children, icon }: CardDashProps) {
  return (
    <Card
      key={id}
      sx={{ width: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <CardMedia
        component='img'
        alt='green iguana'
        height='150'
        image='/brit.jpg'
      />
      <CardContent sx={{ background: '#ffcc00', color: '#1e1e1e', height: '100%' }}>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          color='#333333'
        >
          {heading}
        </Typography>
        <Typography
          variant='body2'
          color='#333333'
        >
          {children}
        </Typography>
      </CardContent>
      <CardActions className={styles.icons}>{icon}</CardActions>
    </Card>
  )
}
