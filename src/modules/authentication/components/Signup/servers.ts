// import {axios} from "axios"
import { FormData } from './Signup'
import axios from 'axios'

const apiUrl = 'http://localhost:3000/api/v1/auth/signup'

export function registerUser(data: FormData) {
  return axios.post(apiUrl, data)
}
