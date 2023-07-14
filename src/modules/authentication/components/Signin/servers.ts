import axios, { AxiosError } from 'axios'
import { FormAuth } from './Signin'

const apiUrl = 'http://localhost:3000/api/v1/auth/signin'

export const autorization = (data: FormAuth) => {
  return axios.post(apiUrl, data)
}
