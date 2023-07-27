import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ResponsiveDrawer from './shared/components/Sidebar/Sidebar.tsx'
import Signin from './modules/authentication/components/Signin/Signin.tsx'
import Signup from './modules/authentication/components/Signup/Signup.tsx'
import AccountPage from './modules/account/pages/AccountPage.tsx'
import DashboardPage from './modules/dashboard/pages/DashboardPage.tsx'
import FilesPage from './modules/files/pages/FillesPage.tsx'
import CoursesPage from './modules/courses/pages/CoursesPage.tsx'
import ClassesPage from './modules/classes/pages/ClassesPage.tsx'
import UsersPage from './modules/users/pages/UsersPage.tsx'
import CalendarPage from './modules/calendar/pages/CalendarPage.tsx'
import AuthPage from './modules/authentication/pages/Auth/AuthPage.tsx'
import { registerLicense } from '@syncfusion/ej2-base'
import ProtectedRoute from './shared/components/ProtectedRoute.tsx'
import Classes from './modules/classes/components/Classes/Classes.tsx'
import Class from './modules/classes/components/Class/Class.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <ProtectedRoute children={<ResponsiveDrawer />} />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'account', element: <AccountPage /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'files', element: <FilesPage /> },
          { path: 'courses', element: <CoursesPage /> },
          {
            path: 'classes',
            element: <ClassesPage />,
            children: [
              { index: true, element: <Classes /> },
              { path: ':id', element: <Class /> },
            ],
          },
          { path: 'users', element: <UsersPage /> },
          { path: 'calendar', element: <CalendarPage /> },
        ],
      },
      {
        element: <AuthPage />,
        children: [
          { path: 'signin', element: <Signin /> },
          { path: 'signup', element: <Signup /> },
        ],
      },
    ],
  },
])

registerLicense(import.meta.env.VITE_LICENSE_KEY as string)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
