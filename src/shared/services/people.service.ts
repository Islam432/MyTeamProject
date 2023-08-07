import axios from 'axios'
import Cookies from 'js-cookie'


const apiUrl = import.meta.env.VITE_API_URL



export function addPeopleToClass (id: number, student_id: number ){
    return  axios.post(`${apiUrl}/classes/${id}/people`, {student_id},{
        headers: {
            Authorization: Cookies.get('token'),
          },
    })
}