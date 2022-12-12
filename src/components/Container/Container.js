import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Divider from '@mui/material/Divider';
import DataTable from '../Table/DataTable';
import FilterTable from '../Table/FilterTable';

const style = {
    padding: 5,

};

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
                <FilterTable />
                <Divider sx={style} />
                <DataTable />
            </Box>
        </Box>
    );
}
