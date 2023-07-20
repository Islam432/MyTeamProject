import { Outlet, useOutletContext } from 'react-router-dom'
import { SnackbarProps } from '../../../../App'
import { memo } from 'react'

export default memo(function AuthPage() {
  const context = useOutletContext<SnackbarProps>()
  return <Outlet context={context} />
})
