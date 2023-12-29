import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Account from './Account.jsx';
import { Link, Outlet } from 'react-router-dom';

// MUI ICONS
import {
  DashboardIcon,
  ProfileIcon,
  AddIcon,
  EmployeeListIcon,
  SettingsIcon,
  LogoutIcon,
} from '../mui components/index';

import { useSelector }  from "react-redux";

// imports for signout functionality
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../store/employeeSlice/employeeSlice.js';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // for conditional rendering when admin === true || admin === false
  const { admin } = useSelector((state) => state.employee);

  // signout functionality
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/employee/sign-out');
      dispatch(signout());
      navigate('/employee-login');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        open={open}
        sx={{ display: 'flex', backgroundColor: 'white' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, color: 'gray', ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color='#2e7d32'>
            <Link to='/dashboard'>
              LitFlix
            </Link>
          </Typography>

          {
            !admin &&
            <div className='ml-auto cursor-pointer flex items-center justify-between'>
              <Account />
            </div>
          }

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h2" noWrap component="div" sx={{paddingX: '12px', paddingTop: '12px', fontSize: '15px', fontWeight: 400}}>MAIN</Typography>
        <List>
          <Link to='/dashboard'>
            <ListItem key='Dashboard' disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: '#2e7d32' }}>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Dashboard'/>
                </ListItemButton>
            </ListItem>
          </Link>
          {
            !admin &&
            <Link to='/profile'>
              <ListItem key='Profile' disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: '#2e7d32' }}>
                      <ProfileIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Profile'/>
                  </ListItemButton>
              </ListItem>
            </Link>
          }
        </List>
        <Typography variant="h2" noWrap component="div" sx={{paddingX: '12px', paddingTop: '5px', fontSize: '15px', fontWeight: 400}}>LISTS</Typography>
        <List>
          {
            admin &&
            <Link to='/add-employee'>
              <ListItem key='Add Employee' disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: '#2e7d32' }}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary='Add Employee'/>
                </ListItemButton>
              </ListItem>
            </Link>
          }
          <Link to='/employee-list'>
            <ListItem key='Employee List' disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: '#2e7d32' }}>
                    <EmployeeListIcon />
                  </ListItemIcon>
                  <ListItemText primary='Employee List'/>
                </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Typography variant="h2" noWrap component="div" sx={{paddingX: '12px', paddingTop: '5px', fontSize: '15px', fontWeight: 400}}>SETTINGS</Typography>
        <List>
          <Link to='/settings'>
            <ListItem key='Settings' disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: '#2e7d32' }}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Settings'/>
                </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/employee-login'>
            <ListItem key='Logout' disablePadding onClick={handleLogout}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: '#2e7d32' }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout'/>
                </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}