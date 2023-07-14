import './App.css'
import Auth from './modules/authentication/pages/Auth/Auth'
import { useRoutes } from 'react-router-dom'
import ResponsiveDrawer from './shared/components/Sidebar/Sidebar'
import Layout from './modules/authentication/components/Layout'

function App() {

  
  const router = useRoutes([
  
  
    // {
    //   path: '/',
    //   element: <ResponsiveDrawer />,
    // },
    {
      path: '/signup',
      element: <Auth />,
    },
    {
      path: '/signup',
      element: <Auth />,
    },
  ])

  return router
  
}

export default App
