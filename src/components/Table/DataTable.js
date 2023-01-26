import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Checkbox from '@mui/material/Checkbox';
// import RateInput from '../Inputs/RateInput';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { getComparator, stableSort, EnhancedTableHead } from './TableMethods';
import { client } from '../../routes/routes';
import './styles.css'

const style = {
    maxWidth: 40,
    borderStyle: "border-box"
};

const headingTextStyle = {
    fontWeight: 550,
}

const btnStyle = {
    color: 'white',
    background: '#9fa8da',
    borderColor: '#9fa8da',
    "&:hover": {
        backgroundColor: "#9fa8da",
        borderColor: '#9e9e9e'
    }
}

export default function DataTable(props) {
    const rows = props.data
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/management/` + selected[0];
        if (selected.length === 1) {
            navigate(path);
        }
    }

    const downloadImage = () => {
        let dataId = selected[0]
        const FileSaver = require('file-saver');
        let path = 'getimage/' + dataId
        client.get(path, { responseType: 'blob' }).then((response) => {
            FileSaver.saveAs(response.data, 'file.jpg');
        })
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n['id']['N']);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <div>
            <Typography variant="h7" noWrap component="div"
                sx={headingTextStyle}>
                이미지리스트 (총 건수 : {rows.length} 건)
            </Typography>
            <Divider sx={{ padding: 2 }} />
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>

                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium' //{dense ? 'small' : 'medium'} 
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        //console.log(row);
                                        const isItemSelected = isSelected(row["id"]["N"]);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row["id"]["N"])}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row["id"]["N"]}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    sx={style}
                                                    align='center'
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row["id"]["N"]}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row['original_file'] !== undefined && row['original_file']['S']}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row['golf_field'] !== undefined && row['golf_field']['S']}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row['originW'] !== undefined && row['originW']['S']} x {row['originH'] !== undefined && row['originH']['S']}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row['registered_date'] !== undefined && row['registered_date']['S']}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button variant="outlined" className='selectBtn' sx={btnStyle} onClick={routeChange}>분석하다</Button>
                                                    <Button variant="outlined" className='downloadButton' sx={btnStyle} startIcon={<DownloadIcon />} onClick={downloadImage}>다운로드</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (33) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[15]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>                
            </Box>
        </div>

    );
}
