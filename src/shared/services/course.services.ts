import axios from 'axios'
import { CourseTemplateManipulate } from '../../modules/courses/components/CoursePage/Courses'
import Cookies from 'js-cookie'

const api = import.meta.env.VITE_API_URL

export function findCourse() {
  return axios.get(`${api}/course`, {
    headers: {
      authorization: Cookies.get('token'),
    },
  })
}

export function deleteCourse(id: number) {
  return axios.delete(`${api}/course/${id}`, {
    headers: {
      authorization: Cookies.get('token'),
    },
  })
}

export function findOneCourse(id: number) {
  return axios.get(`${api}/course/${id}`, {
    headers: {
      authorization: Cookies.get('token'),
    },
  })
}

export function findaAllLevel() {
  return axios.get(`${api}/level`, {
    headers: {
      authorization: Cookies.get('token'),
    },
  })
}

export function addCourse(data: CourseTemplateManipulate) {
  return axios.post(`${api}/course`, data, {
    headers: {
      authorization: Cookies.get('token'),
    },
  })
}

export function updateCourse(id: number, data: CourseTemplateManipulate) {
  return axios.patch(`${api}/course/${id}`, data, {
    headers: {
      authorization: Cookies.get('token'),
    },
  })
}
