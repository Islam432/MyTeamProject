import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL

export function getClasses<T>() {
  return axios.get<T>(`${apiUrl}/classes`, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  })
}
