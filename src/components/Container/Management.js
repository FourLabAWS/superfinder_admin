import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ImageTable from '../Table/ImageInfo';

const headingTextStyle = {
    fontWeight: 500,
}

export default function Container() {
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2, }}
        >
            <br />
            <Toolbar />
            <Typography variant="h6" noWrap component="div"
                sx={headingTextStyle}>
                이미지 정보
            </Typography>
            <br />
            <ImageTable />

        </Box>
    );
}
