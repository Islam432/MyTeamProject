import { CardDash } from '../CardDash/CardDash'
import styles from './index.module.scss'
import { inData, mokData } from './mokData'

export default function DashBoard() {
  const soft = mokData
  const soft2 = inData
  return (
    <>
      <header className={styles.wraper}>
        <div className={styles.text}>
          <h1>Dash-Board</h1>
        </div>
        <section className={styles.active_board}>
          <h2>Published Courses ({mokData.length})</h2>
          <div className={styles.cardbox}>
            {soft.map((item) => {
              return (
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
              )
            })}
          </div>
        </section>
        <section  className={styles.inactive_board}>
          <h2>Inactive Courses ({inData.length})</h2>
          <div className={styles.cardbox2}>
            {soft2.map((item) => {
              return (
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
              )
            })}
          </div>
        </section>
      </header>
    </>
  )
}

{
  /* <div className={styles.cardbox}>
                <div className={styles.card}>
                    <div className={styles.imgbox}>
                        
                        <img className={styles.img} src="./public/lookc.jpg" alt="" />
                    </div>
                    <div className={styles.textbox}>
                        <h2>Germany B1</h2>
                        <p > This course is for learning German language level B1</p>
                    </div>

                </div>
                
            </div> */
}
