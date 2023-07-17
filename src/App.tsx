import Auth from './modules/authentication/pages/Auth/AuthPage'
import { Outlet } from 'react-router-dom'
import ResponsiveDrawer from './shared/components/Sidebar/Sidebar'
import Reg from './modules/authentication/pages/Reg/Reg'

function App() {
  const router = useRoutes([
    {
      path: '/',
      element: <ResponsiveDrawer />,
    },
    {
      path: '/signup',
      element: <Reg />,
    },
    {
      path: '/signin',
      element: <Auth />,
    },
  ])

  return router
}

