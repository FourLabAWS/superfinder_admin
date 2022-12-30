import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import DataTable from '../Table/DataTable';
import ErrorFilterTable from '../Table/ErrorFilterTable';
import FaultStatusTable from '../Table/FaultManagStatus';
import Typography from '@mui/material/Typography';

const style = {
    padding: 2,
};
const headingTextStyle = {
    fontWeight: 550,
}

export default function Container() {
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
        >
            <Toolbar />
            <br />
            <Typography variant="h7" noWrap component="div"
                sx={headingTextStyle}>
                오류 관리 현황
            </Typography>
            <br />
            <FaultStatusTable />
            <ErrorFilterTable />
            <DataTable />
        </Box>
    );
}
