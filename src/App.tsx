import Auth from './modules/authentication/pages/Auth/Auth'
import { useRoutes } from 'react-router-dom'
import ResponsiveDrawer from './shared/components/Sidebar/Sidebar'
import Reg from './modules/authentication/pages/Reg/Reg'
import UserComponents from './modules/authentication/components/users/UserComponents'

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
      path: '/user',
      element: <UserComponents/>,
    },
  ])

  return router
}

export default App
