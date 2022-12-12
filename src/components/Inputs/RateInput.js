import * as React from 'react';
import Rating from '@mui/material/Rating';


export default function RateInput() {
    const [value, setValue] = React.useState(null);
    //console.log(value);

    return (

        <Rating
            max={1}
            size='small'
            name="simple-controlled"
            value={value}
            sx={{ marginRight: 3 }}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
    );
}