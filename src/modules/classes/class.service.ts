import axios from 'axios'
import Cookies from 'js-cookie'
// import ky from 'ky'
const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get('token')
// const apiurl= ky.create({prefixUrl: import.meta.env.VITE_API_URL})
// export const toggler = (data:any, id:any) =>{
//     return apiurl.post(`/classes/${id}/ctoggle`, {json:{open_for_enrollment: data}}).json()
   
// }
export function toggler( data: { open_for_enrollment: boolean}, id: number, ) {
  return axios.post(`${apiUrl}/classes/${id}/ctoggle`, data, {
    headers: {
      Authorization: token,
    },
  });
}
