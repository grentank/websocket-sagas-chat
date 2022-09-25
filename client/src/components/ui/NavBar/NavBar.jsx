import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar, Box, Button, IconButton, Link, Toolbar, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserAsync } from '../../../redux/actions/authActions';

export default function NavBar() {
  const pages = useSelector((state) => state.pages);
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link color="inherit" underline="none" href="/">
              {authUser?.id ? `Hello, ${authUser?.name}` : 'Reload' }
            </Link>
          </Typography>
          {pages?.map((page) => (<Button key={page.title} color="inherit" onClick={() => navigate(page.link)}>{page.title}</Button>))}
          {authUser?.id && <Button key="logout" color="inherit" onClick={() => dispatch(logoutUserAsync())}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
