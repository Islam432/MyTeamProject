import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL

export function getUsers<T>() {
  return axios.get<T>(`${apiUrl}/user`, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  })
}

export function toggleUser(id: number, data: { is_active: boolean }) {
  return axios.post(`${apiUrl}/user/${id}/toggle`, data, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  })
}
