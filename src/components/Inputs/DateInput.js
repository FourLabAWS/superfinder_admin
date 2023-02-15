import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import './styles.css'


export default function DateInput(props) {
    const [value, setValue] = React.useState(dayjs(new Date()));

    const handleInput = (e) => {
        setValue(e.$d);
        let date = new Date(e.$d)
        let month = date.getMonth() + 1
        let formattedDate = date.getFullYear() + '-' + month + '-' + date.getDate()
        props.setDate(formattedDate);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                value={value}
                onChange={handleInput}
                inputFormat="YYYY-MM-DD"
                renderInput={(params) => <TextField
                    InputProps={{ readOnly: true }}
                    sx={{ width: '100%', svg: { color: '#1976d2' } }}
                    size="small" {...params} variant="outlined" />}
            />
        </LocalizationProvider>
    );
}