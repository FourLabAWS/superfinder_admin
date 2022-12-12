import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import DataTable from '../Table/DataTable';
import FilterTable from '../Table/FilterTable';
import Typography from '@mui/material/Typography';

const style = {
    padding: 2,
};
const headingTextStyle = {
    fontWeight: 500,
}

export default function Container() {
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
        >
            <br />
            <Toolbar />
            <Typography variant="h7" noWrap component="div"
                sx={headingTextStyle}>
                Search Image
            </Typography>
            <br />
            <FilterTable />
            <Toolbar />
            <Typography variant="h7" noWrap component="div"
                sx={headingTextStyle}>
                Image List (Total cases: ##)
            </Typography>
            <Divider sx={style} />
            <DataTable />
        </Box>
    );
}
