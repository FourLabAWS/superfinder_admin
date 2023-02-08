import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FilterTable from '../Table/FilterTable';
import Typography from '@mui/material/Typography';

const headingTextStyle = {
    fontWeight: 550,
}

export default function Container() {
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
        >
            <br />
            {/* <Toolbar /> */}
            {/* <Typography variant="h7" noWrap component="div"
                sx={headingTextStyle}>
                이미지 검색
            </Typography>
            <br /> */}
            <FilterTable />
        </Box>
    );
}
