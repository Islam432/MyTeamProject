import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
// import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

const drawerWidth = 200

const links = [
  {
    title: 'Home',
    path: './home',
  },
  {
    title: 'Announcements',
    path: './announcements',
  },
  {
    title: 'Syllabus',
    path: './syllabus',
  },
  {
    title: 'Files',
    path: './files',
  },
  {
    title: 'People',
    path: './people',
  },
  {
    title: 'Discussions',
    path: './discussions',
  },
  {
    title: 'Grades',
    path: './grades',
  },
  {
    title: 'Quizzes',
    path: './quizzes',
  },
  {
    title: 'Assignments',
    path: './assignments',
  },
  {
    title: 'Chat',
    path: './chat',
  },
]

const theme = createTheme({
  palette: { primary: { main: '#ffcc00' } },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#ffcc00',
          },
        },
      },
    },
  },
})

const Class = memo(function () {
  const location = useLocation()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          style: {
            position: 'static',
          },
        }}
        sx={{
          height: '100vh',
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Divider />
        <ThemeProvider theme={theme}>
          <List>
            {links.map((link, index) => (
              <ListItem
                key={index}
                disablePadding
              >
                <ListItemButton
                  component={NavLink}
                  selected={link.path.split('/').pop() === location.pathname.split('/').pop()}
                  to={link.path}
                >
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                  <ListItemText
                    primary={link.title}
                    sx={{ color: '#333' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ThemeProvider>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  )
})

export default Class
