import axios from 'axios'
import Cookies from 'js-cookie'
import { Contact } from '../../modules/account/components/AccountComponents/Account'

const apiUrl = import.meta.env.VITE_API_URL

export async function getOneUser(id: number) {
  return axios.get(`${apiUrl}/user/${id}`, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  })
}
export async function ubdateUser(id: number, data: Contact) {
  return axios.patch(`${apiUrl}/user/${id}`, data, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  })
}
