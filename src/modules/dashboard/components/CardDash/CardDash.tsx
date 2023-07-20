import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Card } from '@mui/material'
import styles from './CardDash.module.scss'
import React from 'react'
interface CardDashProps {
  id: number
  title: string
  img: string
  bc1: string
  bc2: string
  color: string
  color2: string
  bt: string
  children: React.ReactNode
  icon: React.ReactNode
}
export default function CardDash({ id, title, img, bc1, bc2, color, color2, bt, children, icon }: CardDashProps) {
  return (
    <Card
      key={id}
      sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component='img'
        alt='green iguana'
        height='150'
        image={img}
      />
      <CardContent sx={{ background: bc1, color: color }}>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          color={color2}
        >
          {children}
        </Typography>
      </CardContent>
      <CardActions className={styles.icons}>{icon}</CardActions>
    </Card>
  )
}
