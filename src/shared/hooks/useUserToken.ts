import { useState } from 'react'
import Cookies from 'js-cookie'
import parseJwt from '../utils/parseJWT'

function validToken(token: string | null | undefined) {
  if (!token) return false
  const tokenParts = token?.split(' ') ?? ''
  if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) return parseJwt(tokenParts[1])
  return false
}

export default function useUserToken(defaultValue = '') {
  const [storedValue, setStoredValue] = useState(() => {
    const token = Cookies.get('token')
    const user = validToken(token)
    if (user) {
      return user
    } else {
      Cookies.set('token', defaultValue)
      return !!defaultValue
    }
  })
  const setValue = (newValue: string) => {
    const user = validToken(newValue)
    newValue = user ? newValue : ''
    Cookies.set('token', newValue)
    setStoredValue(user)
  }
  return [storedValue, setValue]
}
