import React from "react";
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewIcon from '@mui/icons-material/GridView';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';



import './sidebar.css'

const drawerWidth = 240;
const SideBarItems = [
    { name: 'Dashboard', link: '/', icon: <GridViewIcon /> },
    { name: 'Image Management', link: '/management', icon: <ImageSearchIcon /> },
    { name: 'Error Images', link: '/errors', icon: <BrokenImageIcon /> }

]

const Sidebar = () => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
            className="sidebar"
        >
            <Toolbar><h3 className="adminText">ADMIN</h3></Toolbar>

            <Divider />

            <List>
                {SideBarItems.map((menu) => (
                    <ListItem key={menu.link} disablePadding component={Link} to={menu.link}>
                        <ListItemButton>
                            <ListItemIcon>
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ fontSize: '13px', color: 'black' }} primary={menu.name} />
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>
            <Divider />

        </Drawer>
    )
};


export default Sidebar;
