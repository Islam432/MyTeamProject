import { Outlet, useNavigate } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'
import { createContext, useCallback, useMemo, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import useUserToken from './shared/hooks/useUserToken'

export type AppContextData = {
  setSnackbarMessage: Dispatch<SetStateAction<string>>
  auth: { user: any; login: (token: string) => void; logout: () => void }
}

export const AppContext = createContext<AppContextData>({} as AppContextData)

export default function App() {
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [user, setUser] = useUserToken()
  const navigate = useNavigate()

  const login = useCallback((token: string) => {
    setUser(token)
    navigate('/')
  }, [])

  const logout = useCallback(() => {
    setUser('')
    navigate('/signin')
  }, [])

  const auth = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )

  return (
    <>
      <AppContext.Provider value={{ auth, setSnackbarMessage } as AppContextData}>
        <Outlet />
      </AppContext.Provider>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage('')}
      >
        <Alert
          onClose={() => setSnackbarMessage('false')}
          severity='error'
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
