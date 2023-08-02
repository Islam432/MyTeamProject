import { Outlet, useNavigate } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'
import { createContext, useCallback, useMemo, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import useUserToken from './shared/hooks/useUserToken'

type User = {
  exp: number
  iat: number
  id: number
  role_name: string
  sub: string
}

type Auth = {
  user: User
  login: (token: string) => void
  logout: () => void
}

export type SnackInfo = {
  open: boolean
  type: 'error' | 'success'
  message: string
}

export type AppContextData = {
  setSnack: Dispatch<SetStateAction<SnackInfo>>
  auth: Auth
}

export const AppContext = createContext<AppContextData>({} as AppContextData)

export default function App() {
  const [snack, setSnack] = useState<SnackInfo>({ open: false, type: 'success', message: '' })
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
      <AppContext.Provider value={{ auth, setSnack } as AppContextData}>
        <Outlet />
      </AppContext.Provider>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
          severity={snack.type}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  )
}
