// import {axios} from "axios"
import { FormData } from '../../modules/authentication/components/Signup/Signup'
import { FormAuth } from '../../modules/authentication/components/Signin/Signin'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export function registerUser(data: FormData) {
  return axios.post(`${apiUrl}/auth/signup`, data)
}

export const authorization = (data: FormAuth) => {
  return axios.post(`${apiUrl}/auth/signin`, data)
}
