import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import KeywordSearch from '../Inputs/SelectInput';
import SearchField from '../Inputs/TextInput';
import DateInput from '../Inputs/DateInput';
import RadioInputs from '../Inputs/RadioInput';
import { radioLabels, ratelabels } from './TableData';
import './styles.css'


const headerRowStyle = {
    background: '#f5f5dc',
}

const rows = [
    { name: 'Search Keyword' },
    { name: 'Search period' },
    { name: 'Filters' },
    { name: 'Rate' }
];

const styles = {
    margin: 2,
    marginLeft: 40,
    width: '200px',
    color: '#D3D3D3',
    borderColor: '#D3D3D3'

}

export default function FilterTable() {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size='small'>
                    <TableBody sx={{ border: 1, borderColor: '#D3D3D3' }}>

                        <TableRow
                            key={rows[0].name}
                        >
                            <TableCell component="th" sx={headerRowStyle}>
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
                        >
                            <TableCell component="th" sx={headerRowStyle}>
                                {rows[1].name}
                            </TableCell>
                            <TableCell>
                                <DateInput />
                            </TableCell>
                            <TableCell>
                                <DateInput />
                            </TableCell>
                        </TableRow>

                        <TableRow key={rows[2].name}>
                            <TableCell component="th" sx={headerRowStyle}>
                                {rows[2].name}
                            </TableCell>
                            <TableCell width='30%'>
                                <RadioInputs labels={radioLabels} />
                            </TableCell>


                            <TableRow>
                                <TableCell component="th" sx={headerRowStyle} width='40%'>
                                    {rows[3].name}
                                </TableCell>
                                <TableCell sx={{ width: '100%' }}>
                                    <RadioInputs labels={ratelabels} />
                                </TableCell>

                            </TableRow>

                        </TableRow>

                    </TableBody>
                </Table>

            </TableContainer>

            <div>
                <Button variant="outlined" sx={styles} startIcon={<SearchIcon />}>Search</Button>
            </div>

        </div>
    );
}