import React, { useEffect } from "react";
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import './navbar.css'

const drawerWidth = 240;

const logout = () => {
    localStorage.clear()
    window.location.reload(false);
}

const Navbar = () => {
    const name = localStorage.getItem('name');

    return (
        <AppBar
            style={{ background: 'white' }}
            elevation={0}
            color="transparent"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar>
                <Typography noWrap component="div" variant="h6">
                    <span><b>superfinder</b></span>
                </Typography>
                <Typography noWrap component="div" variant="h7" marginLeft='80%'>
                    <span>{name}</span>
                    <Button startIcon={<LogoutIcon />} onClick={logout} sx={{ color: 'black' }}></Button>
                </Typography>
            </Toolbar>
            <Divider />
        </AppBar>

    );
};

export default Navbar;
