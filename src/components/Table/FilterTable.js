import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import KeywordSearch from '../Inputs/SelectInput';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DateInput from '../Inputs/DateInput';
import Toolbar from '@mui/material/Toolbar';
import DataTable from '../Table/DataTable';
import { client } from '../../routes/routes';

import './styles.css'


const btnStyle = {
    width: "100%",
    fontSize: 12,
    marginLeft: '10%',
    height: '100%',
    borderRadius: 1,
    borderColor: '#7986cb',
    background: '#7986cb',
    color: 'white',
    "&:hover": {
        backgroundColor: "#9fa8da",
        borderColor: '#9fa8da'
    }

}


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 0,
    fontsize: 11
}));


export default function FilterTable() {
    const [value, setValue] = React.useState("");
    const [text, setText] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [rows, setPosts] = React.useState([]);
    // const [analysis, setAnalysis] = React.useState("");    
    // const [rate, setRate] = React.useState("");
    // const [counter, setCount] = React.useState(0);
    // let analisLabels = { labels: radioLabels, func: setAnalysis };
    // let rateLabels = { labels: ratelabels, func: setRate };
    const [params, pushParams] = React.useState({});


    const handleFilter = () => {
        pushParams({
            keyword: value,
            text: text,
            startDate: startDate,
            endDate: endDate
        });
        client.get('getdata', {
            params: {
                keyword: params['keyword'],
                text: params['text'],
                startDate: params['startDate'],
                endDate: params['endDate']
            },
        }).then((response) => {
            setPosts(response.data["Items"]);
        });
    };

    const handleInput = e => {
        setText(e.target.value);
    }

    React.useEffect(() => {
        client.get('getdata').then((response) => {
            setPosts(response.data["Items"]);
        });
    }, []);

    return (
        <div>
            <FormGroup sx={{ width: "80%", marginLeft: "6%" }}>
                <Grid container spacing={0}>
                    <Grid item xs={11}>
                        <Grid container spacing={0}>
                            {/* <Grid item xs={2}>
                                <Item component={Paper} variant='outlined' sx={{ height: '60%', background: '#9fa8da' }}>
                                    검색어
                                </Item>
                            </Grid> */}
                            <Grid item xs={6}>
                                <Item component={Paper} variant='outlined'>
                                    <KeywordSearch setVal={setValue} />
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item component={Paper} variant='outlined'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: 300 },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            value={text}
                                            onChange={handleInput}
                                            id="outlined-basic" variant="standard" size="small" />
                                    </Box>
                                </Item>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            {/* <Grid item xs={1}>
                                <Item component={Paper} variant='outlined' sx={{ height: '61%', background: '#9fa8da' }}>
                                    검색기간
                                </Item>
                            </Grid> */}
                            <Grid item xs={6}>
                                <Item component={Paper} variant='outlined'>
                                    <DateInput setDate={setStartDate} />
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item component={Paper} variant='outlined'>
                                    <DateInput setDate={setEndDate} />
                                </Item>
                            </Grid>
                        </Grid>
                        {/* <Grid container spacing={0}>
                            <Grid item xs={2}>
                                <Item component={Paper} variant='outlined' sx={{ height: '58%', background: '#9fa8da' }}>
                                    분석 결과
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item component={Paper} variant='outlined' sx={{ height: '58%' }}>
                                    <RadioInputs {...analisLabels} />
                                </Item>
                            </Grid>
                            <Grid item xs={2}>
                                <Item component={Paper} variant='outlined' sx={{ height: '58%', background: '#9fa8da' }}>
                                    중요
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item component={Paper} variant='outlined' sx={{ height: '58%' }}>
                                    <RadioInputs {...rateLabels} />
                                </Item>
                            </Grid>
                        </Grid> */}
                    </Grid>

                    <Grid item xs={1}>
                        <Button
                            variant="outlined" size="large"
                            sx={btnStyle}
                            startIcon={<SearchIcon />}
                            onClick={handleFilter}
                        >
                            검색
                        </Button>
                    </Grid>
                </Grid>
            </FormGroup>

            <Toolbar />
            <DataTable data={rows} />
        </div>
    );
}


