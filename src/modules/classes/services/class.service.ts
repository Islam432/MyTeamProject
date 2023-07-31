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

export function toggleEnrollment(id: number, data: { open_for_enrollment: boolean }) {
  return axios.post(`${apiUrl}/classes/${id}/toggle`, data, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  })
}
