import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import KeywordSearch from '../Inputs/SelectInput';
import SearchField from '../Inputs/TextInput';
import DateInput from '../Inputs/DateInput';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './styles.css'

const tableStyle = {
    padding: '10%',
}

const btnStyle = {
    fontSize: 10,
    marginTop: '10%',
    height: '70%',
    borderRadius: 0,
    borderColor: '#9e9e9e',
    background: '#9e9e9e',
    color: 'white',
    "&:hover": {
        backgroundColor: "#9e9e9e",
        borderColor: '#9e9e9e',
    }

}

export default function ErrorFilter() {
    return (
        <Grid container spacing={0} sx={tableStyle}>
            <Grid item xs={10}>
                <TableContainer>
                    <Table aria-label='simple table' size='small'>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ borderBottom: "none" }}>
                                    <p className='label'>등록일자 :</p>
                                </TableCell>

                                <TableCell sx={{ borderBottom: "none" }}>
                                    <DateInput />
                                </TableCell>
                                <TableCell sx={{ borderBottom: "none" }}>
                                    <DateInput />
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell sx={{ borderBottom: "none" }}>
                                    <p className='label'>검 색 어 :</p>
                                </TableCell>

                                <TableCell sx={{ borderBottom: "none" }}>
                                    <KeywordSearch />
                                </TableCell>
                                <TableCell sx={{ borderBottom: "none" }}>
                                    <SearchField />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" size="large" sx={btnStyle} disableRipple>검색</Button>
            </Grid>
        </Grid>
    )
}
