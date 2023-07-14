import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ResponsiveDrawer from './shared/components/Sidebar/Sidebar.tsx'
import SignIn from './modules/authentication/components/Signin/Signin.tsx'
import AccountPage from './modules/account/pages/AccountPage.tsx'
import DashboardPage from './modules/dashboard/pages/DashboardPage.tsx'
import FilesPage from './modules/files/pages/FillesPage.tsx'
import TemplatesPage from './modules/course-templates/pages/TemplatesPage.tsx'
import { CoursesPage } from './modules/courses/pages/CoursesPage.tsx'
import UsersPage from './modules/users/pages/UsersPage.tsx'
import CalendarPage from './modules/calendar/pages/CalendarPage.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <ResponsiveDrawer />,
        children: [
          { index: true, element: <h1>HOME</h1> },
          { path: 'account', element: <AccountPage /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'files', element: <FilesPage /> },
          { path: 'templates', element: <TemplatesPage /> },
          { path: 'courses', element: <CoursesPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'calendar', element: <CalendarPage /> },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
