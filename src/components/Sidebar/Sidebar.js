import React from "react";
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import './sidebar.css'

const drawerWidth = 240;
const SideBarItems = ['Dashboard', 'Image Management', 'Error Images']

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
                {SideBarItems.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ fontSize: '15px' }} primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />

        </Drawer>
    )
};


export default Sidebar;
