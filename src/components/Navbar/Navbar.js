import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './navbar.css'

const drawerWidth = 240;

const Navbar = () => {
    return (
        <AppBar
            style={{ background: 'white' }}
            elevation={0}
            color="transparent"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar>
                <Typography noWrap component="div" variant="h6">
                    <span><b>Superfinder</b></span>
                </Typography>
            </Toolbar>
            <Divider />
        </AppBar>

    );
};

export default Navbar;
