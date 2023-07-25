import styles from './Dashboard.module.scss'
import { PiStudentFill } from 'react-icons/pi'
import { Button } from '@mui/material'
import { BiBell, BiShareAlt } from 'react-icons/bi'
import { BsFolder } from 'react-icons/bs'
import { mokData } from './mokData'
import { useState } from 'react'
import Modal from '../../../../shared/components/Modal/Modal'
import CardAddForm from './CardAddForm'
export default function Dashboard() {
  const [open, setOpen] = useState<boolean>(false)

  const soft = mokData
  const handleCloseModal = () => {
    setOpen(false)
  }
  return (
    <>
      <div className={styles.title}>
        <h1>Dashboard</h1>
        <Button
          variant='contained'
          color='primary'
          className={styles.addbtn}
          onClick={() => {
            setOpen(!open)
          }}
        >
          Добавить новый курс
        </Button>
        <Modal
          title='Добавить новый курс'
          desc=''
          isOpen={open}
          onClose={handleCloseModal}
          btn={''}
        >
          <CardAddForm />
        </Modal>
      </div>
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
                      <PiStudentFill />
                    </Button>
                    <Button size='small'>
                      <BiBell />
                    </Button>
                    <Button size='small'>
                      <BsFolder />
                    </Button>
                    <Button size='small'>
                      <BiShareAlt />
                    </Button>
                  </>
                }
                {...item}
              >
                <p>
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  continents except Antarctica
                </p>
              </CardDash>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
