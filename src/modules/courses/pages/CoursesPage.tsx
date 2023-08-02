import CoursePage from '../components/CoursePage/Courses'
import { memo } from 'react'

const CoursesPage = memo(function () {
  return (
    <div style={{ padding: '1.5rem' }}>
      <CoursePage />
    </div>
  )
})

export default CoursesPage
