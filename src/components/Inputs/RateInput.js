import * as React from 'react';
import Rating from '@mui/material/Rating';


export default function RateInput(val) {
    let rate = 1;
    if (val.val === 'null') rate = null
    const [value, setValue] = React.useState(rate);

    return (
        <Rating
            max={1}
            size='small'
            name="simple-controlled"
            value={value}
            sx={{ marginRight: 3 }}
        />
    );
}