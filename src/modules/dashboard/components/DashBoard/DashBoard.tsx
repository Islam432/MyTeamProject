import CardDash from '../CardDash/CardDash'
import styles from './Dashboard.module.scss'
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
                id={item.id}
                text={item.title}
                img={item.image}
                bc1={item.bc1}
                bc2={item.bc2}
                color={item.color}
                color2={item.color2}
                bt={item.bt}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
