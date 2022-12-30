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
import SearchIcon from '@mui/icons-material/Search';
import './styles.css'

const tableStyle = {
    padding: '6%',
}

const btnStyle = {
    fontSize: 10,
    marginTop: '10%',
    height: '70%',
    borderRadius: 0,
    borderColor: '#7986cb',
    background: '#7986cb',
    color: 'white',
    "&:hover": {
        backgroundColor: "#9fa8da",
        borderColor: '#9fa8da',
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
                <Button variant="outlined" size="large" sx={btnStyle} startIcon={<SearchIcon />}>검색</Button>
            </Grid>
        </Grid>
    )
}
