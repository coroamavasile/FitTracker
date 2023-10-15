import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../../store';
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

  const [open, setOpen] = React.useState(false);

  const routes = [
    { route: 'user-profile', name: 'User Profile', icon: <AccountBoxIcon /> },
    { route: 'dashboard', name: 'Dasboard', icon: <DashboardIcon /> },
    { route: 'nutrition-logger', name: 'Nutrition Logger', icon: <LocalDiningIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open} style={{ background: 'red !important' }}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
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
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding: '16px' }}>
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
