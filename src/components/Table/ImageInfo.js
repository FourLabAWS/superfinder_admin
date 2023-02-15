import * as React from 'react';
import Grid from '@mui/material/Grid';
import ImgBox from '../Image/ImageBox';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { client } from '../../routes/routes';
import { useNavigate } from "react-router-dom";
import './styles.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    borderRadius: 0,
    fontSize: 12
}));


export default function ImageTable() {
    const inch = 0.4;
    const params = useParams()
    const [inchW, setWidth] = React.useState(0);
    const [inchH, setHeight] = React.useState(0);
    const [rowData, setData] = React.useState({});
    const [memo, setMemo] = React.useState('');
    let navigate = useNavigate();

    const goToPrev = () => {
        navigate('/analysis');
    }

    const updateItem = () => {
        const obj = params['id'];
        const path = 'getdata/update/' + obj;
        console.log(path, memo)
        client.patch(path, {
            body: JSON.stringify(memo)
        }).then((response) => {
            console.log(response.data)
        });
    }

    React.useEffect(() => {
        client.get('getdata/' + params['id']).then((response) => {
            setData(response['data']['Item']);
        });
    }, []);

    React.useEffect(() => { rowData['flagW'] !== undefined && setWidth(rowData['flagW']['S'].split(' ')[0] * inch) }, [rowData])
    React.useEffect(() => { rowData['flagH'] !== undefined && setHeight(rowData['flagH']['S'].split(' ')[0] * inch) }, [rowData])
    React.useEffect(() => { rowData['memo'] !== undefined && setMemo(rowData['memo']['S']) }, [rowData])

    return (
        <Paper elevation={0} square sx={{ fontSize: 12 }}>
            <FormGroup>
                <Grid container spacing={0}>
                    <Grid item xs={3} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}><strong>디바이스 ID</strong></Item>
                    </Grid>
                    <Grid item xs={3} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                            {rowData['device_id'] !== undefined && rowData['device_id']['S']}
                        </Item>
                    </Grid>
                    <Grid item xs={3} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }} ><strong>등록일자</strong></Item>
                    </Grid>
                    <Grid item xs={3} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                            {rowData['registered_date'] !== undefined && rowData['registered_date']['S']}
                        </Item>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid container spacing={0} sx={{ borderTop: 1, borderColor: '#D3D3D3' }}>
                        <Grid item xs={2} >
                            <Item component={Paper} variant='outlined' sx={{ height: '100%' }}><strong>파일명</strong></Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                                {rowData['original_file'] !== undefined && rowData['original_file']['S']}
                            </Item>
                        </Grid>

                        <Grid item xs={2} >
                            <Item component={Paper} variant='outlined' sx={{ height: '100%' }} ><strong>깃발 크기</strong></Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                                {rowData['flagW'] !== undefined && rowData['flagW']['S']} x {rowData['flagH'] !== undefined && rowData['flagH']['S']} = {inchW} x {inchH} inch
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}><strong>이미지 분석</strong></Item>
                    </Grid>
                    <Grid item xs={11} >
                        <ImgBox data={rowData} />
                    </Grid>
                </Grid>

                {/* <Grid container spacing={0}>
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
                                            <TextField id="standard-basic" variant="standard" size='small'
                                            />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={1} >
                                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                                            <Button variant="contained">확인</Button>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> */}

                <Grid container spacing={0}>
                    <Grid item xs={1} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}><strong>메모</strong></Item>
                    </Grid>
                    <Grid item xs={11} >
                        <Item component={Paper} variant='outlined' sx={{ height: '100%' }}>
                            <TextField
                                sx={{ width: '100%' }}
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
                <Button variant="contained" className='prevButton' size='small'
                    sx={{ marginTop: '3%' }}
                    onClick={goToPrev}
                >
                    이전
                </Button>
                <Button variant="contained" className='downloadButton' size='small'
                    sx={{ marginTop: '3%', float: 'right' }}
                    onClick={updateItem}
                >
                    저장
                </Button>
            </div>
        </Paper>

    );
}
