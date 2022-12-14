import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './styles.css'
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0
}));


export default function ImgBox(props) {
    const data = props.data
    return (
        <React.Fragment>
            <Grid container spacing={0}>

                <Grid item xs={6} sx={{ borderRight: 1, borderColor: '#D3D3D3' }}>
                    <Grid item xs={12} sx={{ borderBottom: 1, borderColor: '#D3D3D3', backgroundColor: '#f5f5dc' }}>
                        <div className='title'>Original Image</div>
                    </Grid>
                    <Grid container spacing={0} sx={{ padding: 2 }}>
                        <Grid item xs={5}>
                            <img className='imageBox' src={data.origImgPath} />
                        </Grid>
                        <Grid item xs={7}>
                            <Paper elevation={0} square>
                                <ul className='description'>
                                    <li>Size: {data.origImgW} x {data.origImgH}</li>
                                    <li>Volume: {data.origImgV}</li>
                                    <li>Path: {data.origImgPath}</li>
                                </ul>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid item xs={12} sx={{ borderBottom: 1, borderColor: '#D3D3D3', backgroundColor: '#f5f5dc' }}>
                        <div className='title'>Converted Image</div>
                    </Grid>
                    <Grid container spacing={0} sx={{ padding: 2 }}>
                        <Grid item xs={5}>
                            <img className='imageBox' src={data.convImgPath} />
                        </Grid>
                        <Grid item xs={7}>
                            <Paper elevation={0} square>
                                <ul className='description'>
                                    <li>Size: {data.origImgW} x {data.origImgH}</li>
                                    <li>Volume: {data.origImgV}</li>
                                    <li>Path: {data.origImgPath}</li>
                                </ul>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>




        </React.Fragment>
    );
}