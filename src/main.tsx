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
import ClassesPage from './modules/classes/pages/ClassesPage.tsx'
import UsersPage from './modules/users/pages/UsersPage.tsx'
import CalendarPage from './modules/calendar/pages/CalendarPage.tsx'
import AuthPage from './modules/authentication/pages/Auth/AuthPage.tsx'
import { registerLicense } from '@syncfusion/ej2-base'
import ProtectedRoute from './shared/components/ProtectedRoute.tsx'
import Classes from './modules/classes/components/Classes/Classes.tsx'
import Class from './modules/classes/components/Class/Class.tsx'
import PeoplePage from './modules/classes/modules/people/pages/PeoplePage.tsx'
import AnnouncementsPage from './modules/classes/modules/announcements/pages/AnnouncementsPage.tsx'
import AssignmentsPage from './modules/classes/modules/assignments/pages/AssignmentsPage.tsx'
import ChatPage from './modules/classes/modules/chat/pages/ChatPage.tsx'
import DiscussionsPage from './modules/classes/modules/discussions/pages/DiscussionsPage.tsx'
import CourseFilesPage from './modules/classes/modules/files/pages/CourseFilesPage.tsx'
import GradesPage from './modules/classes/modules/grades/pages/GradesPage.tsx'
import HomePage from './modules/classes/modules/home/pages/HomePage.tsx'
import QuizzesPage from './modules/classes/modules/quizzes/pages/QuizzesPage.tsx'
import SyllabusPage from './modules/classes/modules/syllabus/pages/SyllabusPage.tsx'

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
              {
                path: ':id',
                element: <Class />,
                children: [
                  { index: true, element: <HomePage /> },
                  { path: 'people', element: <PeoplePage /> },
                  { path: 'announcements', element: <AnnouncementsPage /> },
                  { path: 'assignments', element: <AssignmentsPage /> },
                  { path: 'chat', element: <ChatPage /> },
                  { path: 'discussions', element: <DiscussionsPage /> },
                  { path: 'files', element: <CourseFilesPage /> },
                  { path: 'grades', element: <GradesPage /> },
                  { path: 'home', element: <HomePage /> },
                  { path: 'quizzes', element: <QuizzesPage /> },
                  { path: 'syllabus', element: <SyllabusPage /> },
                ],
              },
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
