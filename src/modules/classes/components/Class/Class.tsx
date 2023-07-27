import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

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

export default memo(function Class() {
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
        <List>
          {links.map((link, index) => (
            <ListItem
              key={index}
              disablePadding
            >
              <ListItemButton
                component={NavLink}
                to={link.path}
              >
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={link.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
