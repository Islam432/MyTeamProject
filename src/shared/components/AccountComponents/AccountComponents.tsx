import { useEffect } from 'react'
import jwt from 'jsonwebtoken'
// import styles from './styles.module.scss'
import Cookies from 'js-cookie'
import { getOneUsers } from './server'

function parseJwt(token: any) {
  if (!token) {
    return
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}
const AccountComponents = () => {
  useEffect(() => {
    const token = Cookies.get('token')
    const decodedToken = parseJwt(token)

    async function request() {
      try {
        const dataOne = await getOneUsers(decodedToken, token)
        console.log(dataOne.data, token)
      } catch (error) {}
    }
    request()
  }, [])

  return
  ;<div></div>
}

export default AccountComponents
