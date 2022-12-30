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
import { useParams } from 'react-router-dom';
import golf from '../Image/golf.jpg'
import { radioLabels } from './TableData'
import { client } from '../../routes/routes';
import './styles.css'

const data = { deviceId: '9907d4ac2b298628d83c', name: 'superfinder_jpg', registerDate: '20222-11-09 23:11', flagWidth: 38, flagHeight: 28, golfGround: 'selectInput', origImgW: 1000, origImgH: 1000, origImgV: '2K', convImgW: 100, convImgH: 200, convImgV: '1K', origImgPath: golf, convImgPath: golf }

const btnStyle = {
    fontSize: 10,
    borderRadius: 1,
    borderColor: '#7986cb',
    background: '#7986cb',
    color: 'white',
    "&:hover": {
        backgroundColor: "#9fa8da",
        borderColor: '#9fa8da',
    }

}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 0,
    fontSize: 12
}));

export default function ImageTable() {
    const inch = 0.39;
    const params = useParams()
    const [inchW, setWidth] = React.useState(0);
    const [inchH, setHeight] = React.useState(0);
    const [rowData, setData] = React.useState({});
    const [memo, setMemo] = React.useState(rowData['memo'] !== undefined && rowData['memo']['S']);

    React.useEffect(() => {
        client.get('getdetail').then((response) => {
            setData(response['data']['Item']);
        });
    }, []);

    React.useEffect(() => { rowData['width'] !== undefined && setWidth(rowData['width']['S'].split(' ')[0] * inch * inch) })
    React.useEffect(() => { rowData['height'] !== undefined && setHeight(rowData['height']['S'].split(' ')[0] * inch * inch) })
    //if (rowData['width'] !== undefined)
    console.log(inchW, inchH);
    //console.log(rowData['width'] !== undefined && rowData['width']['S'].split(' ')[0] * inch);
    return (
        <Paper elevation={0} square sx={{ fontSize: 12 }}>
            <FormGroup>
                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>디바이스 ID</Item>
                    </Grid>
                    <Grid item xs={3} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                            {rowData['device_id'] !== undefined && rowData['device_id']['S']}
                        </Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }} >파일명</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                            {rowData['original_file'] !== undefined && rowData['original_file']['S']}
                        </Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }} >등록일자</Item>
                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                            {rowData['registered_date'] !== undefined && rowData['registered_date']['S']}
                        </Item>
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
                                    <Button variant="outlined" size="large" sx={btnStyle}>검색</Button>
                                </Item>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={2} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }} >깃발 크기</Item>
                    </Grid>
                    <Grid item xs={4} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                            {rowData['width'] !== undefined && rowData['width']['S']} x {rowData['height'] !== undefined && rowData['height']['S']} = {inchW} x {inchH} inch
                        </Item>
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
                                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                                            <KeywordSearch />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                                            <KeywordSearch />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={5} >
                                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                                            <TextField id="standard-basic" variant="outlined" size='small'
                                            />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={1} >
                                        <Item component={Paper} variant='outlined'>
                                            <Paper variant='outlined'>
                                                <Button variant="text" size="small" sx={btnStyle}>확인</Button>
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
                                value={memo}
                                onChange={(e) => { setMemo(e.target.value) }}
                            />
                        </Item>
                    </Grid>
                </Grid>
            </FormGroup>
            <div >
                <Button variant="outlined" className='prevButton' size='small'
                    sx={{ color: 'white', borderColor: '#7986cb', background: '#7986cb', marginTop: '3%' }}
                >
                    이전
                </Button>
                <Button variant="outlined" className='downloadButton' size='small'
                    sx={{ color: 'white', borderColor: '#7986cb', background: '#7986cb', marginTop: '3%', float: 'right' }}
                >
                    저장
                </Button>
            </div>
        </Paper>

    );
}
