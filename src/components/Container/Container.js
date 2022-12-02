import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import DataTable from '../Table/DataTable';

export default function Container() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
            >
                <Toolbar />
                <DataTable />
            </Box>
        </Box>
    );
}
