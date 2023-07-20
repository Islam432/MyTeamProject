import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { PiStudentFill } from 'react-icons/pi'
import { BsFolder } from 'react-icons/bs'
import { BiBell, BiShareAlt } from 'react-icons/bi'
import { Card } from '@mui/material'
import styles from './CardDash.module.scss'
interface CardDashProps {
  id: number
  text: string
  img: string
  bc1: string
  bc2: string
  color: string
  color2: string
  bt: string
}
export default function CardDash({ id, text, img, bc1, bc2, color, color2, bt }: CardDashProps) {
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
          {text}
        </Typography>
        <Typography
          variant='body2'
          color={color2}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{ background: bc2, display: 'flex', justifyContent: 'space-evenly' }}>
        <Button size='small'>
          <PiStudentFill
            style={{ color: bt }}
            className={styles.icon}
          />
        </Button>
        <Button size='small'>
          <BiBell
            style={{ color: bt }}
            className={styles.icon}
          />
        </Button>
        <Button size='small'>
          <BsFolder
            style={{ color: bt }}
            className={styles.icon}
          />
        </Button>
        <Button size='small'>
          <BiShareAlt
            style={{ color: bt }}
            className={styles.icon}
          />
        </Button>
      </CardActions>
    </Card>
  )
}
