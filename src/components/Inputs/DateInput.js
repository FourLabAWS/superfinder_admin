import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './styles.css'


export default function DateInput(props) {
    const [value, setValue] = React.useState(null);

    const handleInput = (e) => {
        setValue(e.$d);
        let date = new Date(e.$d)
        let month = date.getMonth() + 1
        let formattedDate = date.getFullYear().toString() + '-' + month.toString() + '-' + date.getDate()
        props.setDate(formattedDate);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={value}
                onChange={handleInput}
                inputFormat="YYYY-MM-DD"
                renderInput={(params) => <TextField size="small" {...params} />}
            />
        </LocalizationProvider>
    );
}