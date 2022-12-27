import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import './styles.css'

export default function KeywordSearch() {
    return (
        <Autocomplete
            disablePortal
            size='small'
            id="keywordSearch"
            options={keywords}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} />}
        // renderOption={(props, option) => (
        //     <Typography sx={{ fontSize: 12 }}>
        //         {option.label}
        //     </Typography>)
        // }
        />
    );
}


const keywords = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
];