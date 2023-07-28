import axios from 'axios'
import { CourseTemplateManipulate } from '../components/CoursePage/Course-page'

const api = import.meta.env.VITE_API_URL

export function findCourse(token: string | undefined) {
  return axios.get(`${api}/course`, {
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

export function findaAllLevel(token: string | undefined) {
  return axios.get(`${api}/level`, {
    headers: {
      authorization: token,
    },
  })
}

export function addCourse(token: string | undefined, data: CourseTemplateManipulate) {
  return axios.post(`${api}/course`, data, {
    headers: {
      authorization: token,
    },
  })
}

export function updateCourse(token: string | undefined, id: number, data: CourseTemplateManipulate) {
  return axios.patch(`${api}/course/${id}`, data, {
    headers: {
      authorization: token,
    },
  })
}
