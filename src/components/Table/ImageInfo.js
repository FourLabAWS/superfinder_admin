import * as React from 'react';
import Grid from '@mui/material/Grid';
import ImgBox from '../Image/ImageBox';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import RadioInputs from '../Inputs/RadioInput';
import TextField from '@mui/material/TextField';
import KeywordSearch from '../Inputs/SelectInput';
import Button from '@mui/material/Button';
import golf from '../Image/golf.jpg'
import './styles.css'

const data = { deviceId: '9907d4ac2b298628d83c', name: 'superfinder_jpg', registerDate: '20222-11-09 23:11', flagWidth: 38, flagHeight: 28, golfGround: 'selectInput', origImgW: 1000, origImgH: 1000, origImgV: '2K', convImgW: 100, convImgH: 200, convImgV: '1K', origImgPath: golf, convImgPath: golf }

const headStyle = {
    backgroundColor: '#f5f5dc'
}

const radioLabels = [
    { name: 'normal' },
    { name: 'error' }
]




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0
}));

export default function ImageTable() {
    return (
        <Paper elevation={0} square sx={{ fontSize: 12 }}>
            <FormGroup>
                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={headStyle}>Device ID</Item>
                    </Grid>
                    <Grid item xs={3} >
                        <Item component={Paper} variant='outlined'>{data.deviceId}</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={headStyle}>File Name</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined'>{data.name}</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={headStyle}>Registered Date</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined'>{data.registerDate}</Item>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={headStyle} sx={{ height: '100%' }}>Flag size</Item>
                    </Grid>
                    <Grid item xs={5} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>{data.flagWidth}x{data.flagHeight}</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={headStyle} sx={{ height: '100%' }}>Golf ground</Item>
                    </Grid>
                    <Grid item xs={3} >
                        <Item component={Paper} variant='outlined'>
                            <KeywordSearch />
                        </Item>
                    </Grid>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={headStyle}>
                            <Button variant="text" size="small" sx={{ fontSize: 10, marginLeft: '-10%' }}>Search</Button>
                        </Item>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>Image Analysis</Item>
                    </Grid>
                    <Grid item xs={11} >
                        <ImgBox data={data} />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>Analysis</Item>
                    </Grid>
                    <Grid item xs={11}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} >
                                <Item component={Paper} variant='outlined'><RadioInputs labels={radioLabels} /></Item>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs={1} >
                                <Item component={Paper} variant='outlined'>cause</Item>
                            </Grid>
                            <Grid item xs={11} >
                                <Grid container spacing={0}>
                                    <Grid item xs={3} >
                                        <Item component={Paper} variant='outlined'>
                                            <KeywordSearch />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Item component={Paper} variant='outlined'>
                                            <KeywordSearch />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={5} >
                                        <Item component={Paper} variant='outlined'>
                                            <TextField id="standard-basic" variant="outlined" size='small'
                                            />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={1} >
                                        <Item component={Paper} variant='outlined'>
                                            <Button variant="text" size="small" sx={{ fontSize: 10, marginLeft: '-10%' }}>Confirm</Button>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </FormGroup>
        </Paper>

    );
}
