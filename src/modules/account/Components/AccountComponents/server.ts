import axios  from 'axios';



export async function getOneUsers(data:any,token:any) {
    return axios.get(`http://localhost:3000/api/v1/user/${data.id}`, {
     headers: {
       Authorization: token
     }
    })
 }