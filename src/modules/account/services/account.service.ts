import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get('token')

export async function getOneUser(id: number) {
  return axios.get(`${apiUrl}/user/${id}`, {
    headers: {
      Authorization: token,
    },
  })
}
