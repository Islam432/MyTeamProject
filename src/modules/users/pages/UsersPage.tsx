import Users from '../components/User/Users'
import { memo } from 'react'
export default memo(function UsersPage() {
  return (
    <div style={{padding: '1.5rem'}}>
      <Users />
    </div>
  )
})
