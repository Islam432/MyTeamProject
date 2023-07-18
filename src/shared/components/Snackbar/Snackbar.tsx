import React, { ReactNode, useState } from 'react'
import styles from './styles.module.scss'
import { Alert, Snackbar } from '@mui/material'
interface PropsSnackBar {
  children: ReactNode
  open: boolean
}
const Snack: React.FC<PropsSnackBar> = ({ children, open }) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => !open}
      >
        <Alert
          onClose={() => !open}
          severity='error'
          className={styles.snackbar}
        >
          {children}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Snack
