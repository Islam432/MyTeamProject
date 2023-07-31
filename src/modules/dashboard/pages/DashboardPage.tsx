import { memo } from 'react'
import Dashboard from '../components/Dashboard/DashBoard'

const DashboardPage = memo(function () {
  return (
    <div style={{ padding: '1.5rem' }}>
      <Dashboard />
    </div>
  )
})

export default DashboardPage
