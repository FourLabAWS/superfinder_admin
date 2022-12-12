import * as React from 'react';
import Rating from '@mui/material/Rating';


export default function RateInput() {
    const [value, setValue] = React.useState(1);
    //console.log(value);

    return (

        <Rating
            max={1}
            name="simple-controlled"
            value={null}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
    );
}