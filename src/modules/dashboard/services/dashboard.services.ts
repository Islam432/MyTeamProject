import axios from 'axios'
// import { CourseTemplateManipulate } from '../components/CoursePage/Course-page'

const api = import.meta.env.VITE_API_URL

export function findOffice(token: string | undefined) {
  return axios.get(`${api}/branch`, {
    headers: {
      authorization: token,
    },
  })
}

export function deleteCourse(token: string | undefined, id: number) {
  return axios.delete(`${api}/course/${id}`, {
    headers: {
      authorization: token,
    },
  })
}

export function findOneCourse(token: string | undefined, id: number) {
  return axios.get(`${api}/course/${id}`, {
    headers: {
      authorization: token,
    },
  })
}
