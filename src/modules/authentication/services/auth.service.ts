// import {axios} from "axios"
import { FormData } from '../components/Signup/Signup'
import { FormAuth } from '../components/Signin/Signin'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export function registerUser(data: FormData) {
  return axios.post(apiUrl, data)
}

export const authorization = (data: FormAuth) => {
  return axios.post(apiUrl, data)
}
