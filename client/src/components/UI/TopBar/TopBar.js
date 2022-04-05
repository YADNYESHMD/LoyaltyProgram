import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useHistory } from "react-router-dom";

import "./TopBar.css"

export default function ButtonAppBar(props) {

  const history = useHistory()

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    props.setLoggedOut()
    history.push('/')
  }

  return (
    <Box sx={{ flexGrow: 1, ml: '288px' }}>
      <AppBar position="static" sx={{ boxShadow: 'none', bgcolor: 'rgb(21, 25, 46, 72%)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                className="icon"
              >
                <AccountBalanceWalletIcon />
              </IconButton>
              {props.balance}
          </Typography>
          <Button className="danger" onClick={logout}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              className="icon"
            >
              <LogoutIcon />
            </IconButton>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
