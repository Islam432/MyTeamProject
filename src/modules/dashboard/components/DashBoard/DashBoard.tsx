import CardDash from '../CardDash/CardDash'
import styles from './Dashboard.module.scss'
import { PiStudentFill } from 'react-icons/pi'
import { Button } from '@mui/material'
import { BiBell, BiShareAlt } from 'react-icons/bi'
import { LiaFileSolid } from 'react-icons/lia'
import { mokData } from './mokData'
export default function Dashboard() {
  const soft = mokData
  return (
    <>
      <h1>Dashboard</h1>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {soft.map((item, indx) => (
            <div
              key={indx}
              className={styles.card}
            >
              <CardDash
                icon={
                  <>
                    <Button size='small'>
                      <PiStudentFill className={styles.icon} />
                    </Button>
                    <Button size='small'>
                      <BiBell
                        class
                        Name={styles.icon}
                      />
                    </Button>
                    <Button size='small'>
                      <LiaFileSolid className={styles.icon} />
                    </Button>
                    <Button size='small'>
                      <BiShareAlt className={styles.icon} />
                    </Button>
                  </>
                }
                id={item.id}
                img={item.image}
                bc1={item.bc1}
                bc2={item.bc2}
                title='xz'
                color={item.color}
                color2={item.color2}
                bt={item.bt}
              >
                <p>{item.title}</p>
              </CardDash>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
