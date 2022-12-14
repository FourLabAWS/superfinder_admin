import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function KeywordSearch() {
    return (
        <Autocomplete
            disablePortal
            size='small'
            id="keywordSearch"
            options={keywords}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} />}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const keywords = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
];