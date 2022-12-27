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
import DownloadIcon from '@mui/icons-material/Download';
import golf from '../Image/golf.jpg'
import './styles.css'

const data = { deviceId: '9907d4ac2b298628d83c', name: 'superfinder_jpg', registerDate: '20222-11-09 23:11', flagWidth: 38, flagHeight: 28, golfGround: 'selectInput', origImgW: 1000, origImgH: 1000, origImgV: '2K', convImgW: 100, convImgH: 200, convImgV: '1K', origImgPath: golf, convImgPath: golf }

const radioLabels = [
    { name: 'normal' },
    { name: 'error' }
]

const btnStyle = {
    fontSize: 10,
    borderRadius: 1,
    borderColor: '#9e9e9e',
    background: '#9e9e9e',
    color: 'white',
    "&:hover": {
        backgroundColor: "#757575",
        borderColor: '#757575',
    }

}



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
}));

export default function ImageTable() {
    return (
        <Paper elevation={0} square sx={{ fontSize: 12 }}>
            <FormGroup>
                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>디바이스 ID</Item>
                    </Grid>
                    <Grid item xs={3} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>{data.deviceId}</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }} >파일명</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>{data.name}</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }} >등록일자</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>{data.registerDate}</Item>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>골프장</Item>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container spacing={0} sx={{ borderTop: 1, borderColor: '#D3D3D3' }}>
                            <Grid item xs={9}>
                                <Item component={Paper} elevation={0} sx={{ height: '100%' }}>
                                    <KeywordSearch />
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item component={Paper} elevation={0} sx={{ height: '100%' }}>
                                    <Button variant="outlined" size="large" sx={btnStyle} disableRipple>검색</Button>
                                </Item>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }} >깃발 크기</Item>
                    </Grid>
                    <Grid item xs={4} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>{data.flagWidth}x{data.flagHeight}</Item>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>이미지 분석</Item>
                    </Grid>
                    <Grid item xs={11} >
                        <ImgBox data={data} />
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>분석 결과</Item>
                    </Grid>
                    <Grid item xs={11}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} >
                                <Item component={Paper} variant='outlined' sx={{ height: '100%' }}><RadioInputs labels={radioLabels} /></Item>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={1} >
                                <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>오류 원인</Item>
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
                                            <Paper variant='outlined'>
                                                <Button variant="text" size="small" sx={{ fontSize: 10, marginLeft: '-10%' }}>확인</Button>
                                            </Paper>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>메모</Item>
                    </Grid>
                    <Grid item xs={11} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                            />
                        </Item>
                    </Grid>
                </Grid>
            </FormGroup>
            <div >
                <Button variant="outlined" className='prevButton' size='small'
                    sx={{ color: '#9e9e9e', borderColor: '#9e9e9e', marginTop: '3%' }}
                >
                    이전
                </Button>
                <Button variant="outlined" className='downloadButton' size='small'
                    sx={{ color: '#9e9e9e', borderColor: '#9e9e9e', marginTop: '3%', float: 'right' }}
                    startIcon={<DownloadIcon />}>
                    저장
                </Button>
            </div>
        </Paper>

    );
}
