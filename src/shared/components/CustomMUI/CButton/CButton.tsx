import { Button } from '@mui/material'
import styles from './styles.module.scss'
import { ReactNode } from 'react';

interface CButtonProps {
    children: ReactNode;
  }
  const CButton: React.FC<CButtonProps> = ({ children }) => {
  return (
    <div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={styles.btn}
          >
            {children}
          </Button>
    </div>
  )
}

export default CButton