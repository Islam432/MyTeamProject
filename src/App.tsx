import { Outlet } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'
import { createContext, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'

export type SnackbarProps = {
  setError: Dispatch<SetStateAction<string>>
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>
}

export const SnackbarContext = createContext<SnackbarProps>({} as SnackbarProps)

export default function App() {
  const [error, setError] = useState<string>('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  return (
    <>
      <SnackbarContext.Provider value={{ setError, setOpenSnackbar } as SnackbarProps}>
        <Outlet />
      </SnackbarContext.Provider>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity='error'
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}
