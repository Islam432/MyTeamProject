import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get('token')

export function getUsers() {
  return axios.get(`${apiUrl}/user`, {
    headers: {
      Authorization: token,
    },
  }) 
}

export function toggleUser(id: number, data: { is_active: boolean }) {
  return axios.post(`${apiUrl}/user/${id}/toggle`, data, {
    headers: {
      Authorization: token,
    },
  })
}
