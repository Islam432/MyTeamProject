import axios from 'axios'
import { FormCardAdd } from '../../modules/dashboard/components/DashBoard/DashBoard'
import Cookies from 'js-cookie'

const api = import.meta.env.VITE_API_URL

export function findOffice() {
  return axios.get(`${api}/branch`, {
    headers: {
      authorization: Cookies.get('token'),
    },
  })
}

export function sendClass(data: FormCardAdd) {
  return axios.post(`${api}/classes`, data, {
    headers: {
      authorization: Cookies.get('token'),
    },
  })
}

