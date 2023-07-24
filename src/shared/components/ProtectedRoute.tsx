import { useContext } from 'react'
import { AppContext } from '../../App'
import { Navigate } from 'react-router-dom'
import { JSX } from 'react'

type ProtectedRouteProps = {
  children: JSX.Element | JSX.Element[]
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth } = useContext(AppContext)
  console.log(auth)
  if (!auth.user) {
    return <Navigate to='/signin' />
  }
  return children
}
