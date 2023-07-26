import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL

export async function getOneUser(id: number) {
  return axios.get(`${apiUrl}/user/${id}`, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  })
}
