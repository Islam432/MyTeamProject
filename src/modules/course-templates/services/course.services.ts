import axios from 'axios'

export function findCourse(token: string | undefined) {
  return axios.get(`${import.meta.env.VITE_API_URL}/course`, {
    headers: {
      authorization: token,
    },
  })
}

export function deleteCourse(token: string | undefined, data: number) {
  return axios.delete(`${import.meta.env.VITE_API_URL}/course/${data}`, {
    headers: {
      authorization: token,
    },
  })
}

// export function deleteCourse(token: string | undefined, data: number) {
//   return axios.delete(`${import.meta.env.VITE_API_URL}/course/${data}`, {
//     headers: {
//       authorization: token,
//     },
//   })
// }

export function findaAllLevel(token: string | undefined) {
  return axios.get(`${import.meta.env.VITE_API_URL}/level`, {
    headers: {
      authorization: token,
    },
  })
}
