import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchField() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: 300 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" variant="outlined" size='small' />
        </Box>
    );
}