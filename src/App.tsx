import Auth from './modules/authentication/pages/Auth/Auth'
import { useRoutes } from 'react-router-dom'
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

export default App
