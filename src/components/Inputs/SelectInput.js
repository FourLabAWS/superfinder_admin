import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './styles.css'

export default function KeywordSearch(props) {
    const keywords = ['디바이스ID', '파일명', '골프장', '오류 상태'];
    const [value, setValue] = React.useState(keywords[0]);

    function handleChange(v) {
        setValue(v);
        props.setVal(v);
    }

    return (
        <Autocomplete
            disablePortal
            size='small'
            //id="keywordSearch"
            id="disable-close-on-select"
            disableCloseOnSelect
            value={value}
            onChange={(e, v) => { handleChange(v) }}
            options={keywords}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} variant="standard" />}
        />
    );
}


