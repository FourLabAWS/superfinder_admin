import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeywordSearch from '../Inputs/SelectInput';
import SearchField from '../Inputs/TextInput';
import DateInput from '../Inputs/DateInput';
import RadioInputs from '../Inputs/RadioInput';
import RateInput from '../Inputs/RateInput';

const rowStyle = {
    border: 1,
    borderColor: '#aaaaaa'
}

const rows = [
    { name: 'Search Keyword' },
    { name: 'Search period' },
    { name: 'Filters' },
    { name: 'Importance Rate' }
];

export default function FilterTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>

                    <TableRow
                        key={rows[0].name}
                        sx={{ 'td, th': rowStyle }}
                    >
                        <TableCell component="th" scope="row">
                            {rows[0].name}
                        </TableCell>
                        <TableCell>
                            <KeywordSearch />
                        </TableCell>
                        <TableCell>
                            <SearchField />
                        </TableCell>

                    </TableRow>

                    <TableRow
                        key={rows[1].name}
                        sx={{ 'td, th': rowStyle }}
                    >
                        <TableCell component="th" scope="row">
                            {rows[1].name}
                        </TableCell>
                        <TableCell>
                            <DateInput />
                        </TableCell>
                        <TableCell>
                            <DateInput />
                        </TableCell>
                    </TableRow>

                    <TableRow
                        key={rows[2].name}
                        sx={{ 'td, th': rowStyle }}
                    >
                        <TableCell component="th" scope="row">
                            {rows[2].name}
                        </TableCell>
                        <TableCell>
                            <RadioInputs />
                        </TableCell>
                        <TableCell>
                            {rows[3].name}



                        </TableCell>


                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}