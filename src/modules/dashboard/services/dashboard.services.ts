import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get('token')

export function getClassesCard() {
  return axios.get(`${apiUrl}/classes`, {
    headers: {
      Authorization: token,
    },
  })
}