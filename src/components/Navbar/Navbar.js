import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './navbar.css'

const drawerWidth = 240;

const Navbar = () => {
    return (
        <AppBar
            style={{ background: 'white' }}
            elevation={1}
            color="transparent"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar>
                <Typography noWrap component="div">
                    <span><b>Superfinder</b></span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
