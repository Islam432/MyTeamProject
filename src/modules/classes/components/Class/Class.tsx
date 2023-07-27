import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

const drawerWidth = 200

const links = [
  {
    title: 'Home',
    path: './home',
  },
  {
    title: 'Announcement',
    path: './announcement',
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
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography>
      </Box>
    </Box>
  )
})
