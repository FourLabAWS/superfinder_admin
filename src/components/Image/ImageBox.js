import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './styles.css'

const btnStyle = {
    fontSize: 10,
    borderRadius: 1,
    marginLeft: '10%',
    borderColor: '#7986cb',
    background: '#7986cb',
    color: 'white',
    "&:hover": {
        backgroundColor: "#9fa8da",
        borderColor: '#9fa8da',
    }

}

export default function ImgBox(props) {
    const data = props.data

    return (
        <React.Fragment>
            <Grid container spacing={0}>

                <Grid item xs={6} sx={{ borderRight: 1, borderTop: 1, borderColor: '#D3D3D3' }}>
                    <Grid item xs={12} sx={{ borderBottom: 1, borderColor: '#D3D3D3', backgroundColor: '#e3f2fd' }}>
                        <div className='title'>원본 이미지</div>
                    </Grid>
                    <Grid container spacing={0} sx={{ padding: 2 }}>
                        <Grid item xs={5}>
                            <img className='imageBox' src={data.origImgPath} alt='default' />
                        </Grid>
                        <Grid item xs={7}>
                            <Paper elevation={0} square className='imgdesc'>
                                <ul>
                                    <li>크기: {data.origImgW} x {data.origImgH}</li>
                                    <li>용량: {data.origImgV}</li>
                                    <li>형식: {data.origImgPath}</li>
                                </ul>
                                <Button variant="outlined" size="large" sx={btnStyle}>이미지 다운로드</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} sx={{ borderRight: 1, borderTop: 1, borderColor: '#D3D3D3' }}>
                    <Grid item xs={12} sx={{ borderBottom: 1, borderColor: '#D3D3D3', backgroundColor: '#e3f2fd' }}>
                        <div className='title'>변환 이미지</div>
                    </Grid>
                    <Grid container spacing={0} sx={{ padding: 2 }}>
                        <Grid item xs={5}>
                            <img className='imageBox' src={data.convImgPath} alt='converted' />
                        </Grid>
                        <Grid item xs={7}>
                            <Paper elevation={0} square className='imgdesc'>
                                <ul>
                                    <li>크기: {data.origImgW} x {data.origImgH}</li>
                                    <li>용량: {data.origImgV}</li>
                                    <li>형식: {data.origImgPath}</li>
                                </ul>
                                <Button variant="outlined" size="large" sx={btnStyle}>이미지 다운로드</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>




        </React.Fragment>
    );
}