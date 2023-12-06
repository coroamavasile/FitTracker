import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Avatar from '@mui/material/Avatar';
import CachedIcon from '@mui/icons-material/Cached';

import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { clearAuthenticationStateAction } from '../../../../slices';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  backgroundColor: 'green',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const AppDrawer = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { name, userProfileImage } = useAppSelector((state) => state.authentication);

  const [open, setOpen] = React.useState(false);

  const routes = [
    { route: 'user-profile', name: 'User Profile', icon: <AccountBoxIcon htmlColor="white" /> },
    { route: 'dashboard', name: 'Dasboard', icon: <DashboardIcon htmlColor="white" /> },
    { route: 'nutrition-logger', name: 'Nutrition Logger', icon: <LocalDiningIcon htmlColor="white" /> },
    { route: 'progress-logger', name: 'Progress Logger', icon: <CachedIcon htmlColor="white" /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: 'purple',
            color: 'white',
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {!open ? <ChevronRightIcon htmlColor="white" /> : <ChevronLeftIcon htmlColor="white" />}
          </IconButton>
        </DrawerHeader>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Avatar alt={name} src={userProfileImage} />
            </ListItemIcon>
            <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <List>
          {routes.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block' }}
              onClick={() => {
                if (item.name === 'Logout') {
                  dispatch(clearAuthenticationStateAction());
                }
                navigate(item.route);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem
          disablePadding
          sx={{ display: 'flex', alignItems: 'flex-end', height: '100vh' }}
          onClick={() => {
            dispatch(clearAuthenticationStateAction());

            navigate('/login');
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon htmlColor="white" />
            </ListItemIcon>
            <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding: '16px', background: 'rgba(245, 243, 243, 0.933)' }}>
        <div style={{ height: '95vh' }}>{children}</div>
      </Box>
    </Box>
  );
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

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
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
