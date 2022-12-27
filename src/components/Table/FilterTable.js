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
    background: '#eeeeee',
}

const rows = [
    { name: '검색어' },
    { name: '검색기간' },
    { name: '분석 결과' },
    { name: '중요' }
];

const styles = {
    margin: 2,
    marginLeft: '40%',
    width: '150px',
    color: '#9e9e9e',
    borderColor: '#9e9e9e'

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
                <Button variant="outlined" sx={styles} startIcon={<SearchIcon />}>검색</Button>
            </div>

        </div>
    );
}