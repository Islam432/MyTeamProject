import { useState, useEffect } from 'react'
import styles from './people.module.scss'
import Modal from '../../../../../../shared/components/Modal/Modal'
import { CssButton } from '../../../../../../shared/components/CustomMUI'
import { getUsers } from '../../../../../../shared/services/user.service'
import { useParams } from 'react-router-dom'
import { addPeopleToClass } from '../../../../../../shared/services/people.service'


export interface allUsers {
  id: number
  first_name: string
  last_name: string
  contact_number: string
  role_name: string
  date_of_birth?: string
  is_active: boolean
}

const PeopleComponent = () => {
  const [rows, setRows] = useState<allUsers[]>([])
  const [visbl, setvisibl] = useState<boolean>(false)
  const [student_id, setSelectedUserId] = useState<number | null>(null)


  
  const { id } = useParams()

  
  useEffect(() => {
    const funcGetAll = async () => {
      try {
        const { data } = await getUsers<allUsers[]>()
        console.log(data)
        setRows(data)
      } catch (error) {
        console.log(error)
      }
    }
    funcGetAll()
  }, [])


  const openModal = () => {
    
    setvisibl((visbl) => !visbl)
  }

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId)
  }

  const submitUbdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); 


    if (student_id !== null  && id !== undefined ) {
      addPeopleToClass( +id, student_id);

      setvisibl(false)

    }



   
  }
  
  console.log(student_id)
  console.log(id)
  return (
    <div className={styles.cont}>
      <Modal
        btn={
          
          <CssButton
            className={styles.ButtonModal}
            type='submit'
            variant='contained'
            color='primary'
            onClick={submitUbdate}
            fullWidth
          >
            изменить данные
          </CssButton>
        }
        title='Изменить профиль'
        onClose={() => setvisibl(false)}
        isOpen={visbl}
      >
        {rows.map((item) => {
          return (
            <li
              className={`${styles.li} ${item.id === student_id ? styles.selected : ''}`}
              key={item.id}
              onClick={() => handleUserClick(item.id)}
            >
              {item.first_name}
            </li>
          )
        })}
      </Modal>

      <button
        onClick={openModal}
        className={styles.openModal}
      >
        {' '}
        open Modal{' '}
      </button>
    </div>
  )
}

export default PeopleComponent
