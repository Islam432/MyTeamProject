import { styled, useTheme, Theme, CSSObject, createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { HiChevronRight, HiChevronLeft, HiMenu } from 'react-icons/hi'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItemText } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link } from 'react-router-dom'
import { LuUsers, LuLayoutDashboard } from 'react-icons/lu'
import { BsCalendarDate } from 'react-icons/bs'
import { PiStudent } from 'react-icons/pi'
import { BiBookBookmark } from 'react-icons/bi'
import { BsFolder } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { memo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { MouseEvent } from 'react'

const drawerWidth = 220

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

function handleClick(event: MouseEvent) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const links = [
  {
    title: 'Account',
    path: '/account',
    icon: <FaUserAstronaut />,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LuLayoutDashboard />,
  },
  {
    title: 'Files',
    path: '/files',
    icon: <BsFolder />,
  },
  {
    title: 'Courses',
    path: '/courses',
    icon: <BiBookBookmark />,
  },
  {
    title: 'Classes',
    path: '/classes',
    icon: <PiStudent />,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <LuUsers />,
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: <BsCalendarDate />,
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

export default memo(function ResponsiveDrawer() {
  // const theme = useTheme()
  const [open, setOpen] = useState(true)
  const location = useLocation()
  const paths = location.pathname.split('/').filter((path: string) => path !== '')

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{ bgcolor: 'white' }}
        position='fixed'
        open={open}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            {/* <MenuIcon sx={{ color: '#333' }} /> */}
            <HiMenu color='#333' />
          </IconButton>
          <div
            role='presentation'
            onClick={handleClick}
          >
            <Breadcrumbs aria-label='breadcrumb'>
              <Link
                className={styles.link}
                to='/'
              >
                HOME
              </Link>
              {paths.map((path: string, indx: number) => (
                <div key={indx}>
                  <Link
                    className={styles.link}
                    to={`/${paths.slice(0, indx + 1).join('/')}`}
                  >
                    {path.toUpperCase()}
                  </Link>
                </div>
              ))}
            </Breadcrumbs>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={styles.xz}
        variant='permanent'
        open={open}
      >
        <DrawerHeader sx={{ bgcolor: '#333' }}>
          <img
            className={styles.logo}
            src="'../../../../public/logo-light.svg"
            alt=''
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <HiChevronRight /> : <HiChevronLeft className={styles.iconRight} />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <ThemeProvider theme={theme}>
          <List sx={{ bgcolor: '#333' }}>
            {links.map((data, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  selected={data.path === location.pathname.slice(0, data.path.length)}
                  component={NavLink}
                  to={data.path}
                >
                  <ListItemIcon>{data.icon}</ListItemIcon>
                  {/* <p className={styles.pcolor}>{data.title}</p> */}
                  <ListItemText
                    primary={data.title}
                    sx={{ color: 'white', margin: '0.8rem 0' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ThemeProvider>

        <Divider />
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1 }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
})
