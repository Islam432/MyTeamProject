import { memo } from 'react'
import Dashboard from './../components/Dashboard/Dashboard'

export default memo(function DashboardPage() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <Dashboard />
    </div>
  )
})
