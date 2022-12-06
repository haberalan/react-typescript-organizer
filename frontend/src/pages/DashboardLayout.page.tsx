import {
  Stack,
  Drawer,
  Typography,
  AppBar,
  Link,
  Avatar,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser, selectUser } from '../store/user/userSlice';
import { useAppSelector } from '../common/hooks/useRedux';

export const DashboardLayout = () => {
  // Layout
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };
  const menuOpen = Boolean(menuAnchorEl);

  // Logout and Avatar letter
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const user = useAppSelector(selectUser);

  return (
    <Stack direction="column" sx={{ height: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={2} py={1}>
          <IconButton size="large" color="inherit" onClick={handleOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
              }}
            >
              {user.user?.email[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu anchorEl={menuAnchorEl} open={menuOpen} onClick={handleCloseMenu}>
            <MenuList
              sx={{
                padding: 0,
              }}
            >
              <MenuItem component={RouterLink} to="/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">Settings</Typography>
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">Logout</Typography>
                </ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
        <Stack direction="column" width="240px" alignItems="center" p={2} spacing={4} sx={{ height: '100%' }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            <Typography variant="h4" component="div">
              Organizer
            </Typography>
          </Link>
          <List>
            <ListItem
              component={RouterLink}
              to="/dashboard"
              onClick={handleCloseDrawer}
              sx={{
                width: '200px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Home</Typography>
              </ListItemText>
            </ListItem>
            <ListItem
              component={RouterLink}
              to="/dashboard/todos"
              onClick={handleCloseDrawer}
              sx={{
                width: '200px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Todos</Typography>
              </ListItemText>
            </ListItem>
            <ListItem
              component={RouterLink}
              to="/dashboard/notes"
              onClick={handleCloseDrawer}
              sx={{
                width: '200px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Notes</Typography>
              </ListItemText>
            </ListItem>
            <ListItem
              component={RouterLink}
              to="/dashboard/expenses"
              onClick={handleCloseDrawer}
              sx={{
                width: '200px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              <ListItemIcon>
                <LocalAtmOutlinedIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Expenses</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Stack>
        <Link
          href="https://github.com/haberalan"
          sx={{
            textAlign: 'center',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          <Typography variant="body1" component="p">
            &copy; 2022 Alan Haber
          </Typography>
        </Link>
      </Drawer>
      <Stack sx={{ height: '100%' }} direction="column" alignItems="center">
        <Outlet />
      </Stack>
    </Stack>
  );
};
